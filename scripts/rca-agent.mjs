#!/usr/bin/env node
/**
 * RCA Agent — Test Failure Root Cause Analysis
 *
 * Triggered by CI when functional-regression fails.
 * 1. Parses JUnit XML for failed tests + error messages
 * 2. Reads git diff (failing commit vs its parent)
 * 3. Classifies failure: LOCATOR | FUNCTIONAL | ENVIRONMENT | SCRIPT
 * 4. Calls GitHub Models API (GPT-4o) for fix proposals
 * 5. Posts a structured RCA comment on the PR
 *
 * Required env vars (all available automatically in GitHub Actions):
 *   GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_SHA,
 *   GITHUB_RUN_ID, PR_NUMBER (injected by the CI job)
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

// ─── Config ────────────────────────────────────────────────────────────────
const GITHUB_TOKEN    = process.env.GITHUB_TOKEN;
const REPO            = process.env.GITHUB_REPOSITORY;          // owner/repo
const SHA             = process.env.GITHUB_SHA;
const RUN_ID          = process.env.GITHUB_RUN_ID;
const PR_NUMBER       = process.env.PR_NUMBER;
const JUNIT_PATH      = process.env.JUNIT_PATH || 'test-results/e2e-junit.xml';
const MODELS_ENDPOINT = 'https://models.inference.ai.azure.com';
const MODEL           = 'gpt-4o';

// ─── Failure classifiers ────────────────────────────────────────────────────
const CLASSIFIERS = [
  {
    type: 'LOCATOR',
    label: '🔍 Locator / Selector Change',
    patterns: [
      /locator\(\)/i, /strict mode violation/i, /getBy.*not found/i,
      /no element found/i, /element.*not visible/i, /waiting for.*selector/i,
      /target closed/i, /element handle is disposed/i,
    ],
    description: 'A UI element the test targets has changed (moved, renamed, or removed). The test selector is now stale.',
    steps: [
      'Open Playwright HTML report → find the failing test → check the "Before" screenshot',
      'Inspect the current DOM for the element the test was looking for',
      'Update the locator in the spec file or `helpers.ts`',
      'Run the test in headed mode: `npm run test:e2e:headed -- --grep "<test-name>"`',
    ],
  },
  {
    type: 'FUNCTIONAL',
    label: '❌ Functional Regression',
    patterns: [
      /expected.*received/i, /toHaveText/i, /toHaveValue/i, /toBeVisible/i,
      /assertion.*failed/i, /expect\(/i, /toBe\(/i, /toEqual/i,
    ],
    description: 'App behaviour changed and the test caught a real regression. The expected output no longer matches actual output.',
    steps: [
      'Review the git diff below to identify which component/logic changed',
      'Determine if the app change was intentional',
      'If intentional: update the test expectation to match the new behaviour',
      'If a bug: revert or fix the application code',
      'Run: `npm run test:e2e -- --grep "<test-name>"` to verify the fix',
    ],
  },
  {
    type: 'ENVIRONMENT',
    label: '⚙️ Environment / Infrastructure Issue',
    patterns: [
      /timeout/i, /ECONNREFUSED/i, /net::ERR/i, /page.*crashed/i,
      /browser.*closed/i, /server.*not.*start/i, /ENOENT/i, /spawn/i,
    ],
    description: 'The test infrastructure failed — server didn\'t start, port conflict, or network issue. Not a code bug.',
    steps: [
      'Check CI logs for the "Build app" and "Run functional regression suite" steps',
      'Verify `vite preview` starts correctly on port 12000',
      'Check if any dependency install step failed',
      'Re-run the workflow manually: Actions → CI → Re-run failed jobs',
    ],
  },
  {
    type: 'SCRIPT',
    label: '🛠️ Test Script Error',
    patterns: [
      /SyntaxError/i, /TypeError/i, /Cannot find module/i, /ReferenceError/i,
      /is not a function/i, /Cannot read prop/i, /import/i,
    ],
    description: 'The test code itself has a bug — syntax error, import failure, or broken helper. Not an app regression.',
    steps: [
      'Read the stack trace carefully — it points to the exact file and line',
      'Fix the test script (not the app)',
      'Run `npx playwright test --list` to verify tests compile',
      'Run the failing test locally to confirm fix',
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function classify(errorText) {
  for (const classifier of CLASSIFIERS) {
    if (classifier.patterns.some(p => p.test(errorText))) {
      return classifier;
    }
  }
  return {
    type: 'UNKNOWN',
    label: '❓ Unknown',
    description: 'Could not automatically classify this failure.',
    steps: ['Review the full error message and stack trace in the CI logs.'],
  };
}

function parseJUnit(xmlPath) {
  if (!existsSync(xmlPath)) {
    console.warn(`JUnit file not found: ${xmlPath}`);
    return [];
  }
  const xml = readFileSync(xmlPath, 'utf8');
  const failures = [];
  const testcaseRegex = /<testcase[^>]+name="([^"]+)"[^>]*(?:classname="([^"]*)")?[^>]*>([\s\S]*?)<\/testcase>/g;
  let match;
  while ((match = testcaseRegex.exec(xml)) !== null) {
    const [, name, classname, body] = match;
    const failureMatch = body.match(/<(?:failure|error)[^>]*(?:message="([^"]*)")?[^>]*>([\s\S]*?)<\/(?:failure|error)>/);
    if (failureMatch) {
      const message = failureMatch[1] || '';
      const stackTrace = failureMatch[2] || '';
      failures.push({ name, classname: classname || '', message, stackTrace, fullError: `${message}\n${stackTrace}` });
    }
  }
  return failures;
}

function getGitDiff() {
  try {
    return execSync('git diff HEAD~1 HEAD -- src/ --unified=5', { encoding: 'utf8', maxBuffer: 200_000 }).slice(0, 8000);
  } catch {
    try {
      return execSync('git show --stat HEAD', { encoding: 'utf8' });
    } catch {
      return 'Git diff unavailable';
    }
  }
}

function getChangedFiles() {
  try {
    return execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'Unknown';
  }
}

async function callGitHubModels(systemPrompt, userPrompt) {
  const response = await fetch(`${MODELS_ENDPOINT}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 1200,
      temperature: 0.2,
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GitHub Models API error ${response.status}: ${err}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response from model.';
}

async function postPRComment(body) {
  if (!PR_NUMBER) {
    console.log('No PR_NUMBER set — skipping PR comment. RCA output:\n', body);
    return;
  }
  const url = `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ body }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${err}`);
  }
  console.log(`RCA comment posted to PR #${PR_NUMBER}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 RCA Agent starting...');

  const failures = parseJUnit(JUNIT_PATH);

  if (failures.length === 0) {
    console.log('No failures found in JUnit report — nothing to analyse.');
    process.exit(0);
  }

  console.log(`Found ${failures.length} failed test(s)`);

  const gitDiff     = getGitDiff();
  const changedFiles = getChangedFiles();

  // Classify each failure
  const analysed = failures.map(f => ({
    ...f,
    classification: classify(f.fullError),
  }));

  // Build AI prompt for fix proposals
  const failureSummary = analysed.map((f, i) =>
    `### Failure ${i + 1}: ${f.name}\n` +
    `**Type**: ${f.classification.type}\n` +
    `**Error**: ${f.message}\n` +
    `**Stack**:\n\`\`\`\n${f.stackTrace.slice(0, 600)}\n\`\`\``
  ).join('\n\n');

  const systemPrompt = `You are an expert test automation engineer specialising in Playwright and React.
You analyse CI test failures and produce concise, actionable root cause analysis with specific code fixes.
Always reference specific file names and line patterns. Use diff format for code changes.
Keep each fix proposal under 200 words. Be direct, not verbose.`;

  const userPrompt = `A GitHub Actions CI pipeline failed with ${failures.length} Playwright test failure(s).

## Changed files in this commit
${changedFiles}

## Git diff (source files only)
\`\`\`diff
${gitDiff}
\`\`\`

## Test failures
${failureSummary}

For each failure, provide:
1. One-line root cause
2. Specific code fix (diff format if possible)
3. Command to verify locally

Be concise. Reference actual file/line where possible.`;

  let aiAnalysis = '';
  try {
    console.log('Calling GitHub Models API for fix proposals...');
    aiAnalysis = await callGitHubModels(systemPrompt, userPrompt);
  } catch (err) {
    console.warn('AI analysis unavailable:', err.message);
    aiAnalysis = '_AI analysis unavailable — check GitHub Models API access._';
  }

  // Build the PR comment
  const tableRows = analysed.map(f =>
    `| \`${f.name}\` | ${f.classification.label} | ${f.classification.description} |`
  ).join('\n');

  const stepsSection = [...new Set(analysed.map(f => f.classification.type))].map(type => {
    const classifier = CLASSIFIERS.find(c => c.type === type) || analysed.find(f => f.classification.type === type)?.classification;
    if (!classifier) return '';
    return `### ${classifier.label} — Recommended Steps\n${classifier.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  }).join('\n\n');

  const comment = `## 🔍 Test Failure RCA — Run [#${RUN_ID}](https://github.com/${REPO}/actions/runs/${RUN_ID})

> **${failures.length} test(s) failed** on commit \`${SHA?.slice(0, 7)}\`
> Changed files: \`${changedFiles.split('\n').join('`, `')}\`

---

### Failure Classification

| Test | Root Cause Type | Description |
|------|----------------|-------------|
${tableRows}

---

### 🤖 AI-Proposed Fixes

${aiAnalysis}

---

### 📋 Step-by-Step Resolution Guide

${stepsSection}

---

### 🔗 Quick Links
- [Full CI logs](https://github.com/${REPO}/actions/runs/${RUN_ID})
- [Playwright HTML Report](https://github.com/${REPO}/actions/runs/${RUN_ID}) _(download \`playwright-report\` artifact)_
- Run a single test locally: \`npm run test:e2e -- --grep "<test-name>"\`
- Debug mode: \`npm run test:e2e:debug -- --grep "<test-name>"\`

<sub>Generated by RCA Agent • ${new Date().toISOString()}</sub>`;

  await postPRComment(comment);

  console.log('✅ RCA Agent complete');

  // Exit with failure so CI marks the job as failed (it's informational)
  process.exit(1);
}

main().catch(err => {
  console.error('RCA Agent error:', err);
  process.exit(1);
});

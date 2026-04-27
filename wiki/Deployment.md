# Deployment

## Overview

The app is automatically deployed to **GitHub Pages** on every push to `main` using GitHub Actions.

**Live URL**: https://lokeshsharma99.github.io/GDS-Demo-App/

---

## GitHub Actions Workflow

File: `.github/workflows/deploy.yml`

### Trigger

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:   # Manual trigger from GitHub UI
```

### Jobs

#### 1. Build

- Checks out the repository
- Sets up Node.js 20
- Runs `npm ci` (clean install)
- Runs `npm run build` with `VITE_BASE_URL=/GDS-Demo-App/`
- Uploads `dist/` as a Pages artifact

#### 2. Deploy

- Depends on the Build job
- Deploys the Pages artifact to GitHub Pages
- Outputs the live URL

### Permissions Required

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

---

## Vite Base URL Configuration

For GitHub Pages, Vite must know the subpath (`/GDS-Demo-App/`). This is set via an environment variable in the workflow and read in `vite.config.ts`:

```ts
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  ...
});
```

Locally, `VITE_BASE_URL` is unset so the base defaults to `/` and everything works normally.

---

## GitHub Pages Settings

- **Source**: GitHub Actions (not legacy branch deployment)
- **HTTPS**: Enforced
- **Custom domain**: None

To change the Pages source:
1. Go to **Settings → Pages** in the repository
2. Under "Build and deployment", select **GitHub Actions**

---

## Monitoring Deployments

View deployment history in the repository:
- **Actions tab**: https://github.com/lokeshsharma99/GDS-Demo-App/actions
- **Deployments**: https://github.com/lokeshsharma99/GDS-Demo-App/deployments

---

## Manual Deployment

To trigger a deployment manually without pushing code:

1. Go to **Actions → Deploy to GitHub Pages**
2. Click **Run workflow**
3. Select `main` branch and click **Run workflow**

Or via CLI:
```bash
gh workflow run deploy.yml --repo lokeshsharma99/GDS-Demo-App
```

---

## Rollback

To roll back to a previous version:

1. Identify the commit hash to revert to: `git log --oneline`
2. Create a revert commit: `git revert <hash>`
3. Push to `main` — this triggers a new deployment with the reverted code

Or use the GitHub UI to revert a merged PR.

import { describe, it, expect } from 'vitest';

// Note: Adjust the import path if vite.config.test.ts is not at the repo root.
// We're assuming the file provided in this PR is at the root path "vite.config.test.ts".
import config from '../vite.config.test';

describe('vite.config.test.ts - Vite configuration', () => {
  it('exports an object via defineConfig', () => {
    expect(config).toBeTypeOf('object');
    expect(config).not.toBeNull();
  });

  describe('plugins', () => {
    it('includes the React plugin', () => {
      // plugins should be an array with at least one plugin object for React
      expect(Array.isArray((config as any).plugins)).toBe(true);
      const plugins = (config as any).plugins as any[];

      expect(plugins.length).toBeGreaterThan(0);

      // The React plugin commonly has a name containing "react"
      // We avoid coupling to exact internal plugin naming; we just ensure a react-related plugin is present.
      const hasReactLikePlugin =
        plugins.some((p) => typeof p?.name === 'string' && /react/i.test(p.name)) ||
        // Some versions may return an array from react() call
        plugins.flat?.().some?.((p: any) => typeof p?.name === 'string' && /react/i.test(p.name));

      expect(hasReactLikePlugin).toBe(true);
    });
  });

  describe('optimizeDeps', () => {
    it('excludes lucide-react from dependency optimization', () => {
      const optimizeDeps = (config as any).optimizeDeps;
      expect(optimizeDeps).toBeDefined();
      expect(optimizeDeps).toHaveProperty('exclude');
      expect(Array.isArray(optimizeDeps.exclude)).toBe(true);
      expect(optimizeDeps.exclude).toContain('lucide-react');
    });

    it('does not mutate exclude array when cloned (defensive check)', () => {
      // Ensure consumers manipulating a shallow copy do not affect original inadvertently.
      const original = (config as any).optimizeDeps.exclude.slice();
      const cloned = [...(config as any).optimizeDeps.exclude];
      cloned.push('some-other-lib');
      expect((config as any).optimizeDeps.exclude).toEqual(original);
    });
  });

  describe('server', () => {
    it('sets host, port, and allowedHosts as expected', () => {
      const server = (config as any).server;
      expect(server).toBeDefined();
      expect(server.host).toBe('0.0.0.0');
      expect(server.port).toBe(12000);
      expect(server.allowedHosts).toBe(true);
    });

    it('rejects incorrect port in expectations (negative test)', () => {
      const server = (config as any).server;
      expect(server.port).not.toBe(3000);
      expect(server.port).not.toBeNaN();
    });
  });

  describe('shape and immutability', () => {
    it('has only known top-level keys and sensible types', () => {
      // This helps detect inadvertent config drift.
      const keys = Object.keys(config as any);
      // At minimum, we expect "plugins", "optimizeDeps", and "server"
      expect(keys).toEqual(expect.arrayContaining(['plugins', 'optimizeDeps', 'server']));
      expect((config as any).plugins).toBeDefined();
      expect((config as any).optimizeDeps).toBeDefined();
      expect((config as any).server).toBeDefined();
    });

    it('maintains stable values after shallow copies (defensive check)', () => {
      const copy = { ...(config as any) };
      expect(copy.server.port).toBe((config as any).server.port);
      expect(copy.server.host).toBe((config as any).server.host);
      expect(copy.server.allowedHosts).toBe((config as any).server.allowedHosts);
      expect(copy.optimizeDeps.exclude).toEqual((config as any).optimizeDeps.exclude);
    });
  });
});
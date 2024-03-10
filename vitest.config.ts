import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['lcov', 'text-summary'],
      reportsDirectory: 'dist/coverage',
      include: ['src/**'],
      exclude: ['src/**/index.ts', 'src/@types', 'src/taninsam.ts'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
        autoUpdate: true
      }
    }
  }
});

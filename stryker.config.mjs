// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  htmlReporter: {
    fileName: 'dist/stryker-reports/report.html'
  },
  testRunner: 'vitest',
  testRunner_comment:
    'Take a look at https://stryker-mutator.io/docs/stryker-js/vitest-runner for information about the vitest plugin.',
  coverageAnalysis: 'perTest',
  mutate: ['src/**/*.ts', '!src/**/*.spec.ts'],
  vitest: {
    dir: 'src'
  }
};
export default config;

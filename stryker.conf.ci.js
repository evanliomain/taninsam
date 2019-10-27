module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['html', 'dashboard'],
    htmlReporter: {
      baseDir: 'dist/docs/stryker-reports'
    },
    testRunner: 'jest',
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts', '!src/**/*.spec.ts'],
    jest: {
      enableFindRelatedTests: true
    }
  });
};

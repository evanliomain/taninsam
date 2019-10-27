module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.ts': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.spec)\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/stryker-tmp'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'clover', 'html'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  collectCoverage: true
};

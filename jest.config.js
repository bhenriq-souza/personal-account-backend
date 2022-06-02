const { isCI, readFile, yamlParser } = require('@domgen/dgx-common-core')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './reports/jest/html/index.html',
        includeConsoleLog: true,
        includeFailureMsg: true,
        includeSuiteFailure: true,
      }
    ],
    [
      'jest-junit',
      {
        outputDirectory: './reports/jest',
        outputName: 'jest-junit.xml',
        reportTestSuiteErrors: true
      }
    ]
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json'
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts'
  ],
  coverageDirectory: './reports/coverage',
  coverageReporters: [
    'text',
    'html',
    'cobertura',
    'clover'
  ],
  testMatch: [
    '**/test/**/*.test.(ts|tsx)'
  ],
  setupFiles: [
    './jestEnv.js'
  ],
  maxWorkers: 1
}

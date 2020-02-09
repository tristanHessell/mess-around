/* eslint-env node */
module.exports = {
  collectCoverageFrom: ['src/frontend/**/*.{js,jsx}'],
  // setupFiles: [''],
  setupFilesAfterEnv: ['<rootDir>/src/frontend/jest.setup.js'],
  testMatch: [
    '<rootDir>/src/frontend/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/frontend/**/*.{spec,test}.{js,jsx}',
    '<rootDir>/src/tests/enzyme/**/*.{spec,test}.{js,jsx}',
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node'],
  watchPathIgnorePatterns: [
    '<rootDir>/src/backend/',
    '<rootDir>/src/tests/cypress/',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  globals: {
    ENV: {
      API_URL: 'http://localhost:5000',
    },
  },
};

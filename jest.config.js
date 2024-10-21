export default {
  testEnvironment: 'node',
  globalSetup: './src/tests/globalSetup.ts',
  globalTeardown: './src/tests/globalTeardown.ts',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  restoreMocks: true,
  resetMocks: true,
  transform: {
    '^.+\\.m?ts$': 'ts-jest',
  },
};

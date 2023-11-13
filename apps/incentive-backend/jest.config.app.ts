export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../../coverage/tinf21_incentive',
  testEnvironment: 'node',
  displayName: 'tinf21_incentive',
  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)'],
  preset: '../../jest.preset.js',
};

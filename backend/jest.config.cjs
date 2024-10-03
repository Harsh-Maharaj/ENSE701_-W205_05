module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.[tj]s$': 'babel-jest', // Use babel-jest for JS and TS files
    },
    transformIgnorePatterns: ['/node_modules/'],
    testTimeout: 20000,
  };
  
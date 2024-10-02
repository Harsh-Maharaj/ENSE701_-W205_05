module.exports = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
  testEnvironment: 'jsdom', // Use jsdom environment for React components
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // File extensions to be tested
  testPathIgnorePatterns: [
    '<rootDir>/.next/', // Ignore Next.js build directory
    '<rootDir>/node_modules/', // Ignore node_modules
    '<rootDir>/cypress/', // Ignore Cypress tests in Jest
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore transforming node_modules
    '<rootDir>/.next/',
    '<rootDir>/cypress/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Use @ to refer to src folder
    '\\.(scss|css|less)$': 'identity-obj-proxy', // Mock CSS modules
  },
};

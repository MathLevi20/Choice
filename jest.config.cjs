module.exports = {
    // ...
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },

  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],  testEnvironment: 'jsdom',

  };
  
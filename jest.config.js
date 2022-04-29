module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    'ts-jest': {
      // Setting this greatly speeds up test execution time
      // https://stackoverflow.com/questions/45087018/jest-simple-tests-are-slow
      isolatedModules: true,
    },
  },
};
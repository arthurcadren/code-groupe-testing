module.exports = {
  testMatch: [
    "**/tests/**/*.js", // Only run tests in the /tests folder
  ],
  testPathIgnorePatterns: [
    "/frontend/", // Ignore all frontend tests
    "/node_modules/",
  ],
  roots: ["<rootDir>/tests"], // Only look for tests in /tests
};
/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  globals: { "ts-jest": { useESM: true } },
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  reporters: ["default", "github-actions"],
  preset: "ts-jest/presets/default-esm",
  resetMocks: true,
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testRunner: "jest-circus/runner",
  verbose: true,
};

const processStdoutWrite = process.stdout.write.bind(process.stdout);

process.stdout.write = (string_, encoding, callback) => {
  if (!String(string_).startsWith("::")) {
    return processStdoutWrite(string_, encoding, callback);
  }
};

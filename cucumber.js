// cucumber.js
let common = [
  "src/_tests_/features/**/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require src/_tests_/features/support/**/*.ts", // Load step definitions
  "--format progress-bar", // Load custom formatter
  "--format node_modules/cucumber-pretty", // Load custom formatter
].join(" ");

module.exports = {
  default: common,
};

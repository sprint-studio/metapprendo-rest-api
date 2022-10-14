// cucumber.js
let common = [
  "./src/__tests__/features/**/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require ./src/__tests__/features/support/**/*.ts", // Load step definitions
  "--format progress-bar", // Load custom formatter
].join(" ");

module.exports = {
  default: common,
};

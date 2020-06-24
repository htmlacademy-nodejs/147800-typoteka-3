"use strict";

const chalk = require(`chalk`);
const packageJsonFile = require(`../../../package.json`);

const run = () => {
  const version = packageJsonFile.version;
  console.info(chalk.blue(version));
};

module.exports = {
  name: `--version`,
  run
};

"use strict";

const pino = require(`pino`);

const logger = pino(
  {
    name: `pino-and-express`,
    level: process.env.LOG_LEVEL || `info`,
    prettyPrint: true,
  },
  `./src/service/logs`
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};

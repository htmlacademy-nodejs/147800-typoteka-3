"use strict";

const express = require(`express`);
const chalk = require(`chalk`);
const routes = require(`../api/routes`);
const { getLogger } = require(`../logger`);

const PORT = 3000;

const app = express();
app.use(express.json());

const logger = getLogger();

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(`/api`, (req, res, next) => {
  routes(req, res, next);
  logger.info(`End request with status code ${res.statusCode}`);
});

app.use((req, res) => {
  res.status(404).send(`Page not found`);
  logger.error(`End request with error ${res.statusCode}`);
});

app.use((error) => {
  logger.error(`${error}`);
});

const run = (args) => {
  const [customPort] = args;
  const port = Number.parseInt(customPort, 10) || PORT;

  app
    .listen(port, () => {
      console.info(chalk.green(`Server starts on PORT ${port}`));
      logger.info(`Server start on ${port}`);
    })
    .on(`error`, (err) => {
      logger.error(`Server can't start. Error: ${err}`);
    });
};

module.exports = {
  name: `--server`,
  run,
  app,
};

"use strict";

const fs = require(`fs`).promises;
const express = require(`express`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const run = args => {
  const [customPort] = args;
  const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

  const app = express();
  app.use(express.json());

  app.get(`/posts`, async (req, res) => {
    try {
      const fileContent = await fs.readFile(FILENAME);
      const mocks = JSON.parse(fileContent);
      res.json(mocks);
    } catch (error) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
    }
  });

  app.listen(port);
};

module.exports = {
  name: "--server",
  run
};

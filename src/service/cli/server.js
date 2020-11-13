"use strict";

const express = require(`express`);
const articlesRoutes = require(`./routes/articles`);

const PORT = 3000;

const run = (args) => {
  const [customPort] = args;
  const port = Number.parseInt(customPort, 10) || PORT;

  const app = express();
  app.use(express.json());

  app.use(`/api/articles`, articlesRoutes);

  app.get(`/api/categories`, (req, res) => {
    res.send(`Send categories`);
  });

  app.get(`/api/search`, (req, res) => {
    res.send(`Search with query param "${req.query.query}"`);
  });

  app.listen(port);
};

module.exports = {
  name: `--server`,
  run,
};

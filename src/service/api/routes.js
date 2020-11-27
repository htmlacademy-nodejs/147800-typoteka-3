"use strict";

const fs = require(`fs`).promises;
const { Router } = require(`express`);
const { readContent } = require(`../cli/generate`);
const articlesRoutes = require(`./routes/articles`);

const app = new Router();
const FILENAME = `mocks.json`;
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

app.use(`/articles`, articlesRoutes);

app.get(`/categories`, async (req, res) => {
  const categories = await readContent(`./data/categories.txt`);
  res.json(categories);
});

app.get(`/search`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const offers = JSON.parse(fileContent);
    const { query } = req.query;
    const filteredOffers = offers.filter((offer) =>
      offer.title.toLowerCase().includes(query.toLowerCase().trim())
    );
    res.json(filteredOffers);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = app;

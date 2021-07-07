"use strict";

const { Router } = require(`express`);
const { CategoryService } = require(`../data-service`);
const articlesRoutes = require(`./routes/articles`);

const app = new Router();
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

app.use(`/articles`, articlesRoutes);

app.get(`/categories`, async (req, res) => {
  const { count } = req.query;
  const categories = await new CategoryService().findAll(count);
  res.status(HttpCode.OK).json(categories);
});

app.get(`/categories/:id`, async (req, res) => {
  const { id } = req.params;
  const category = await new CategoryService().findOne(id);
  res.status(HttpCode.OK).json(category);
});

app.get(`/search`, async (req, res) => {
  try {
    const { query } = req.query;
    const articles = new CategoryService().findAll({ query });
    res.json(articles);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = app;

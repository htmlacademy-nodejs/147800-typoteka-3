"use strict";

const { Router } = require(`express`);
const articlesRoutes = require(`./routes/articles`);

const app = new Router();

app.use(`/articles`, articlesRoutes);

app.get(`/categories`, (req, res) => {
  res.send(`Send categories`);
});

app.get(`/search`, (req, res) => {
  res.send(`Search with query param "${req.query.query}"`);
});

module.exports = app;

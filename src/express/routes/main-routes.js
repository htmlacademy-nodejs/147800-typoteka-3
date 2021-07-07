"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const mainRouter = new Router();

const URL = `http://localhost:3000`;

mainRouter.get(`/categories`, (req, res) => res.render(`main/all-categories`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/search`, async (req, res) => {
  const { data: articles } = await axios.get(`${URL}/api/search`, {
    params: { query: req.query.search || `` }
  });
  res.render(`main/search`, {
    articles
  });
});
mainRouter.get(`/`, async (req, res) => {
  const { data: articles } = await axios.get(`${URL}/api/articles`);
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`main/main`, { articles, categories });
});

module.exports = mainRouter;

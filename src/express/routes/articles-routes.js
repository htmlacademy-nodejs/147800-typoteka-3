"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const articlesRouter = new Router();

const URL = `http://localhost:3000`;

articlesRouter.get(`/add`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`articles/new-post`, { categories });
});
articlesRouter.post(`/add`, async (req, res) => {
  try {
    await axios.post(`${URL}/api/articles`, req.body);
    res.redirect(`/my`);
  } catch (error) {
    const { data: categories } = await axios.get(`${URL}/api/categories`);
    res.render(`articles/new-post`, { data: req.body, categories });
  }
});
articlesRouter.get(`/category/:id`, (req, res) =>
  res.render(`articles/articles-by-category`)
);
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const { data: article } = await axios.get(
    `${URL}/api/articles/${req.params.id}`
  );
  res.render(`articles/post`, { article });
});
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));

module.exports = articlesRouter;

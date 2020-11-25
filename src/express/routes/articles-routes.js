"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const articlesRouter = new Router();

const URL = `http://localhost:3000`;

articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
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

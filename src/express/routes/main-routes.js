"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const upload = require(`../middlewares/upload`);
const mainRouter = new Router();

const URL = `http://localhost:3000`;
const ARTICLES_PER_PAGE = 8;

mainRouter.get(`/categories`, (req, res) => res.render(`main/all-categories`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/register`, (req, res) => {
  const { error } = req.query;
  res.render(`main/sign-up`, { error });
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const userData = {
    avatar: file.filename,
    firstName: body[`first-name`],
    lastName: body[`last-name`],
    email: body[`email`],
    password: body[`password`],
    passwordRepeated: body[`password-again`]
  };
  try {
    await axios.post(`${URL}/api/user`, userData);
    res.redirect(`/login`);
  } catch (error) {
    res.redirect(`/register?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRouter.get(`/search`, async (req, res) => {
  const { data: articles } = await axios.get(`${URL}/api/search`, {
    params: { query: req.query.search || `` }
  });
  res.render(`main/search`, {
    articles
  });
});
mainRouter.get(`/`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);

  let { page = 1 } = req.query;
  page = +page;
  const limit = ARTICLES_PER_PAGE;
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const {
    data: { count, articles }
  } = await axios.get(`${URL}/api/articles`, {
    params: { limit, offset }
  });
  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  res.render(`main/main`, { articles, categories, page, totalPages });
});

module.exports = mainRouter;

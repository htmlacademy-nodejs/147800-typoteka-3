"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const myRouter = new Router();

const URL = `http://localhost:3000`;

myRouter.get(`/comments`, (req, res) => res.render(`my/comments`));
myRouter.get(`/`, async (req, res) => {
  const { data } = await axios.get(`${URL}/api/articles`);
  res.render(`my/my`, { articles: data });
});

module.exports = myRouter;

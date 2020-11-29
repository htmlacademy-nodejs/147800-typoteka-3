"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const myRouter = new Router();

const URL = `http://localhost:3000`;

myRouter.get(`/comments`, async (req, res) => {
  const { data: articles } = await axios.get(`${URL}/api/articles`);
  const { data: firstArticleComments } = await axios.get(
    `${URL}/api/articles/${articles[0].id}/comments`
  );
  const { data: secondArticleComments } = await axios.get(
    `${URL}/api/articles/${articles[1].id}/comments`
  );
  const { data: thirdArticleComments } = await axios.get(
    `${URL}/api/articles/${articles[2].id}/comments`
  );
  const comments = [
    ...firstArticleComments,
    ...secondArticleComments,
    ...thirdArticleComments,
  ];

  res.render(`my/comments`, { comments });
});
myRouter.get(`/`, async (req, res) => {
  const { data } = await axios.get(`${URL}/api/articles`);
  res.render(`my/my`, { articles: data });
});

module.exports = myRouter;

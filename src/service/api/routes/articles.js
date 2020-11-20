"use strict";

const fs = require(`fs`).promises;
const { Router } = require(`express`);
const articlesRouter = new Router();

const FILENAME = `mocks.json`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

articlesRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mockContent = JSON.parse(fileContent);
    res.json(mockContent);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

articlesRouter.post(`/`, (req, res) => {
  res.send(`Add new article`);
});

articlesRouter.get(`/:articleId`, (req, res) => {
  if (Number(req.params.articleId) < 0) {
    return res.status(HttpCode.NOT_FOUND).send(`Article not found`);
  }
  res.send(`Return article by articleId="${req.params.articleId}"`);
});

articlesRouter.put(`/:articleId`, (req, res) => {
  res.send(`Update article with articleId="${req.params.articleId}"`);
});

articlesRouter.delete(`/:articleId`, (req, res) => {
  res.send(`Delete article with articleId="${req.params.articleId}"`);
});

articlesRouter.get(`/:articleId/comments`, (req, res) => {
  res.send(`Return article comments by articleId="${req.params.articleId}"`);
});

articlesRouter.post(`/:articleId/comments`, (req, res) => {
  res.send(
    `Add new comment to article with articleId="${req.params.articleId}"`
  );
});

articlesRouter.delete(`/:articleId/comments/:commentId`, (req, res) => {
  res.send(
    `Delete comment with commentId="${req.params.commentId}" of article with articleId="${req.params.articleId}"`
  );
});

module.exports = articlesRouter;
"use strict";

const { Router } = require(`express`);
const articlesRouter = new Router();
const { ArticleService } = require(`../../data-service`);

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

articlesRouter.get(`/`, async (req, res) => {
  const { count, query, categoryId, userId } = req.query;

  try {
    const articles = await new ArticleService().findAll({
      query,
      count,
      categoryId,
      userId
    });
    res.status(HttpCode.OK).json(articles);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

articlesRouter.post(`/`, (req, res) => {
  res.send(`Add new article`);
});

articlesRouter.get(`/:articleId`, async (req, res) => {
  try {
    const { articleId } = req.params;
    const [selectedArticle] = await new ArticleService().findAll({
      articleId
    });
    if (!selectedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Article not found`);
    }
    res.status(HttpCode.OK).json(selectedArticle);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

articlesRouter.put(`/:articleId`, (req, res) => {
  res.send(`Update article with articleId="${req.params.articleId}"`);
});

articlesRouter.delete(`/:articleId`, (req, res) => {
  res.send(`Delete article with articleId="${req.params.articleId}"`);
});

articlesRouter.get(`/:articleId/comments`, async (req, res) => {
  const { articleId } = req.params;

  try {
    const comments = await new ArticleService().findArticleComments({
      articleId
    });
    if (!comments.length) {
      return res.status(HttpCode.NOT_FOUND).send(`Comments not found`);
    }
    res.status(HttpCode.OK).json(comments);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
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

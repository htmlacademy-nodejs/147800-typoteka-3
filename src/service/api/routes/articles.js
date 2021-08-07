"use strict";

const { Router } = require(`express`);
const articlesRouter = new Router();
const { HttpCode } = require(`../../../constants`);
const articleValidator = require(`../../middlewares/article-validator`);
const articleExist = require(`../../middlewares/article-exists`);
const commentValidator = require(`../../middlewares/comment-validator`);
const routeParamsValidator = require(`../../middlewares/route-params-validator`);
const { ArticleService, CommentService } = require(`../../data-service`);

articlesRouter.get(`/`, async (req, res) => {
  const { count, query, categoryId, userId, offset, limit } = req.query;

  try {
    if (offset || limit) {
      const articles = await new ArticleService().findPage({
        categoryId,
        limit,
        offset
      });

      res.status(HttpCode.OK).json(articles);
    } else {
      const articles = await new ArticleService().findAll({
        query,
        count,
        categoryId,
        userId
      });
      res.status(HttpCode.OK).json(articles);
    }
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

articlesRouter.post(`/`, articleValidator, async (req, res) => {
  const article = await new ArticleService().create(req.body);

  return res.status(HttpCode.CREATED).json(article);
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

articlesRouter.put(
  `/:articleId`,
  [routeParamsValidator, articleValidator],
  async (req, res) => {
    const { articleId } = req.params;

    const updated = await new ArticleService().update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }
    return res.status(HttpCode.OK).send(`Updated`);
  }
);

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

articlesRouter.post(
  `/:articleId/comments`,
  [routeParamsValidator, articleExist(ArticleService), commentValidator],
  async (req, res) => {
    const { articleId } = req.params;

    const comment = await new CommentService().create(articleId, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  }
);

articlesRouter.delete(`/:articleId/comments/:commentId`, (req, res) => {
  res.send(
    `Delete comment with commentId="${req.params.commentId}" of article with articleId="${req.params.articleId}"`
  );
});

module.exports = articlesRouter;

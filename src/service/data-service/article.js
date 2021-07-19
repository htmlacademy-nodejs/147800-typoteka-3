"use strict";

const { Op } = require(`sequelize`);
const Aliase = require(`../models/constants/aliase`);
const { Categories, Comments, Articles, Users } = require(`../models/index`);

class ArticleService {
  async findAll({ query, articleId, userId, categoryId }) {
    let whereStatement = {};
    if (articleId) {
      whereStatement = { ...whereStatement, id: articleId };
    }
    if (query) {
      whereStatement = {
        ...whereStatement,
        title: {
          [Op.substring]: query
        }
      };
    }
    const articles = await Articles.findAll({
      where: whereStatement,
      include: [
        { model: Comments, as: Aliase.COMMENTS },
        {
          model: Categories,
          as: Aliase.CATEGORIES,
          where: categoryId ? { id: categoryId } : {}
        }
      ],
      attributes: { exclude: [`userId`] }
    });
    return articles;
  }

  async findPage({ categoryId, limit, offset }) {
    const { count, rows } = await Articles.findAndCountAll({
      limit,
      offset,
      include: [
        { model: Comments, as: Aliase.COMMENTS },
        {
          model: Categories,
          as: Aliase.CATEGORIES,
          where: categoryId ? { id: categoryId } : {}
        }
      ],
      distinct: true
    });
    return { count, articles: rows };
  }

  async findArticleComments({ articleId }) {
    const comments = await Comments.findAll({
      where: { articleId },
      attributes: { exclude: [`articleId`] }
    });
    return comments;
  }
}

module.exports = ArticleService;

"use strict";

const { Op } = require(`sequelize`);
const Aliase = require(`../models/constants/aliase`);
const { Articles, Users } = require(`../models/index`);

class SearchService {
  async findAll(searchText) {
    const articles = await Articles.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [
        Aliase.CATEGORIES,
        {
          model: Users,
          as: Aliase.USER,
          attributes: {
            exclude: [`password`]
          }
        }
      ]
    });
    return articles.map((article) => article.get());
  }
}

module.exports = SearchService;

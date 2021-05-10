"use strict";

const Sequelize = require(`sequelize`);
const { Categories, ArticleCategories } = require(`../models/index`);

class CategoryService {
  findOne(id) {
    return Categories.findOne({
      where: {
        id
      },
      attributes: [
        `id`,
        `label`,
        [Sequelize.fn(`COUNT`, Sequelize.col(`category_id`)), `count`]
      ],
      group: [Sequelize.col(`id`)],
      include: [
        {
          model: ArticleCategories,
          as: `articleCategories`,
          attributes: []
        }
      ]
    });
  }

  findAll() {
    return Categories.findAll({
      attributes: [
        `id`,
        `label`,
        [Sequelize.fn(`COUNT`, Sequelize.col(`category_id`)), `count`]
      ],
      group: [Sequelize.col(`id`)],
      order: [[`id`, `ASC`]],
      include: [
        {
          model: ArticleCategories,
          as: `articleCategories`,
          attributes: []
        }
      ]
    });
  }
}

module.exports = CategoryService;

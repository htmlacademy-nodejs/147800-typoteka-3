"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    `ArticleCategories`,
    {
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: `articles`,
          key: `id`
        },
        field: `article_id`
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: `categories`,
          key: `id`
        },
        field: `category_id`
      }
    },
    {
      sequelize,
      tableName: `article_categories`,
      schema: `public`,
      timestamps: false
    }
  );
};

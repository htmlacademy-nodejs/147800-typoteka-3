"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    `Comments`,
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: `articles`,
          key: `id`
        },
        field: `article_id`
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: `created_at`
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: `users`,
          key: `id`
        },
        field: `user_id`
      }
    },
    {
      sequelize,
      tableName: `comments`,
      schema: `public`,
      timestamps: false,
      indexes: [
        {
          name: `comments_pk`,
          unique: true,
          fields: [{ name: `id` }]
        }
      ]
    }
  );
};

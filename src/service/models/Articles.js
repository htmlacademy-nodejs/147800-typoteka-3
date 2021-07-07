"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    `Articles`,
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: `created_at`
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      retinaPicture: {
        type: DataTypes.STRING,
        allowNull: true,
        field: `retina_picture`
      },
      announce: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fullText: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: `full_text`
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
      tableName: `articles`,
      schema: `public`,
      timestamps: false,
      indexes: [
        {
          name: `articles_id_idx`,
          unique: true,
          fields: [{ name: `id` }]
        },
        {
          name: `articles_pk`,
          unique: true,
          fields: [{ name: `id` }]
        }
      ]
    }
  );
};

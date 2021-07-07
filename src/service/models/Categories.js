"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    `Categories`,
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: `categories`,
      schema: `public`,
      timestamps: false,
      indexes: [
        {
          name: `categories_id_idx`,
          unique: true,
          fields: [{ name: `id` }]
        },
        {
          name: `categories_pk`,
          unique: true,
          fields: [{ name: `id` }]
        }
      ]
    }
  );
};

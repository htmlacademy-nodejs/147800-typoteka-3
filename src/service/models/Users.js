"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    `Users`,
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: `first_name`
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: `last_name`
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: `users`,
      schema: `public`,
      timestamps: false,
      indexes: [
        {
          name: `users_pk`,
          unique: true,
          fields: [{ name: `id` }]
        }
      ]
    }
  );
};

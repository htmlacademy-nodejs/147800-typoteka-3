"use strict";

require(`dotenv`).config();
const Sequelize = require(`sequelize`);

const { database, user, password, host } = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST
};

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: `postgres`
});

module.exports = sequelize;

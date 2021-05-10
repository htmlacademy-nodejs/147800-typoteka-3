"use strict";

require(`dotenv`).config();
const Sequelize = require(`sequelize`);

const { database, user, password, host } = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST
};

(async () => {
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: `postgres`
  });

  try {
    await sequelize.authenticate();
    console.log(`Соединение с сервером установлено!`);
  } catch (err) {
    console.error(`Не удалось установить соединение по причине: ${err}`);
  }
})();

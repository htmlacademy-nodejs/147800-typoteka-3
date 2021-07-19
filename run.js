"use strict";

const fs = require(`fs`);
const sequelize = require(`./src/service/sequelize`);

const schemaSql = fs.readFileSync(`./schema.sql`, `utf8`);
const fillDbSql = fs.readFileSync(`./fill-db.sql`, `utf8`);

sequelize.query(`
${schemaSql}

${fillDbSql}`);

"use strict";

const Aliase = require(`./constants/aliase`);
let DataTypes = require(`sequelize`).DataTypes;
let _ArticleCategories = require(`./ArticleCategories`);
let _Articles = require(`./Articles`);
let _Categories = require(`./Categories`);
let _Comments = require(`./Comments`);
let _Users = require(`./Users`);

function initModels(sequelize) {
  let ArticleCategories = _ArticleCategories(sequelize, DataTypes);
  let Articles = _Articles(sequelize, DataTypes);
  let Categories = _Categories(sequelize, DataTypes);
  let Comments = _Comments(sequelize, DataTypes);
  let Users = _Users(sequelize, DataTypes);

  ArticleCategories.belongsTo(Articles, {
    as: Aliase.ARTICLE,
    foreignKey: `articleId`
  });
  Articles.hasMany(ArticleCategories, {
    as: Aliase.ARTICLE_CATEGORIES,
    foreignKey: `articleId`
  });
  Comments.belongsTo(Articles, { as: Aliase.ARTICLE, foreignKey: `articleId` });
  Articles.hasMany(Comments, { as: Aliase.COMMENTS, foreignKey: `articleId` });
  ArticleCategories.belongsTo(Categories, {
    as: Aliase.CATEGORY,
    foreignKey: `categoryId`
  });
  Categories.hasMany(ArticleCategories, {
    as: Aliase.ARTICLE_CATEGORIES,
    foreignKey: `categoryId`
  });
  Articles.belongsToMany(Categories, {
    through: ArticleCategories,
    as: Aliase.CATEGORIES,
    foreignKey: `articleId`
  });
  Categories.belongsToMany(Articles, {
    through: ArticleCategories,
    foreignKey: `categoryId`
  });
  Articles.belongsTo(Users, { as: Aliase.USER, foreignKey: `userId` });
  Users.hasMany(Articles, { as: Aliase.ARTICLE, foreignKey: `userId` });
  Comments.belongsTo(Users, { as: Aliase.USER, foreignKey: `userId` });
  Users.hasMany(Comments, { as: Aliase.COMMENTS, foreignKey: `userId` });

  return {
    ArticleCategories,
    Articles,
    Categories,
    Comments,
    Users
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

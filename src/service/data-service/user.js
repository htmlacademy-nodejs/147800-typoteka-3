"use strict";

const { Users } = require(`../models/index`);

class UserService {
  async create(userData) {
    const user = await Users.create(userData);
    return user.get();
  }

  async findByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    return user && user.get();
  }
}

module.exports = UserService;

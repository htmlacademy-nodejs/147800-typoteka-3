"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../../constants`);
const userValidator = require(`../../middlewares/user-validator`);
const passwordUtils = require(`../../lib/password`);
const { UserService } = require(`../../data-service`);

const userRouter = new Router();

userRouter.post(`/`, userValidator(UserService), async (req, res) => {
  const data = req.body;

  data.password = await passwordUtils.hash(data.password);
  const result = await new UserService().create(data);

  delete result.password;

  res.status(HttpCode.CREATED).json(result);
});

module.exports = userRouter;

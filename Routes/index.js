const { homeRoute } = require("./homeRoute");
const { loggedInUserRouter } = require("./loggedInUserRoute");
const { loginRoute } = require("./loginRoute");
const { registerRoute } = require("./registerRoute");
const { todoRoute } = require("./todoRoute");
const { usersRouter } = require("./usersRoute");

module.exports = {
  homeRoute,
  registerRoute,
  loginRoute,
  usersRouter,
  todoRoute,
  loggedInUserRouter
};

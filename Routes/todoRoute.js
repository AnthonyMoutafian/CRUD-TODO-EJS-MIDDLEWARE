const express = require("express");
const {
  readFile,
  createPath,
  createPathForLoggedInUser,
  readFileForLoggedInUser,
} = require("../middleware");
const { createPathCustom } = require("../helpers");

const todoRoute = express.Router();

todoRoute.use(express.static("view"));

todoRoute.get(
  "/",
  [createPathForLoggedInUser, readFileForLoggedInUser],
  (req, res) => {
    const loggedInUser = res.locals.loggedInUser;

    if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
      return res.status(401).json({
        message: "User must be logged in",
      });
    }

    res.render(createPathCustom("todo"), {
      todos: loggedInUser.todos,
    });
  },
);

module.exports.todoRoute = todoRoute;

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

async function getLoggedInUser() {
  const res = await fetch("http://localhost:3000/loggedInUser");
  return await res.json();
}

async function saveUser(user) {
  await fetch("http://localhost:3000/loggedInUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

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

todoRoute.post(
  "/create",
  [createPathForLoggedInUser, readFileForLoggedInUser],
  async (req, res) => {
    const loggedInUser = res.locals.loggedInUser;

    if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
      return res.status(401).json({
        message: "User must be logged in to create Todos",
      });
    }

    const { todo } = req.body;

    if (!todo || todo.trim() === "") {
        return res.status(400).json({
            message: "Todo is required",
        });
    }

    const user = await getLoggedInUser();

    user.todos.push({
      id: Date.now(),
      todo,
      isEditing: false,
      isChecked: false,
    });

    await saveUser(user);

    res.render(createPathCustom("todo"), {
      todos: user.todos,
    });

    res.redirect("/todo")
  },
);

module.exports.todoRoute = todoRoute;

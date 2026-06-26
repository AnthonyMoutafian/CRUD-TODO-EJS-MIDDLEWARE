const express = require("express");
const { createPath, readFile } = require("../middleware");
const fs = require("fs").promises;
const { schema } = require("../schema/schema");
const usersRouter = express.Router();

usersRouter.get("/", [createPath, readFile], async (req, res) => {
  res.json(res.locals.users);
  return;
});

usersRouter.get("/:id", [createPath, readFile], async (req, res) => {
  const id = parseInt(req.params.id);
  const user = res.locals.users.find((user) => user.id === id);
  res.json(user);
  return;
});

usersRouter.post("/", [createPath, readFile], async (req, res) => {
  try {
    const newUser = await schema.validateAsync(req.body);
    newUser.id = Date.now();
    newUser.todos = [];
    const users = res.locals.users;
    const checkDuplicateEmail = users.find(
      (user) => user.email === newUser.email,
    );

    if (!checkDuplicateEmail) {
      res.locals.users.push(newUser);

      await fs.writeFile(
        res.locals.pathToDB,
        JSON.stringify(res.locals.users),
        "utf-8",
      );

      res.redirect("/login");
    } else {
      res.status(401).json({
        message: "user exists already",
      });
    }
    return;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

usersRouter.patch("/:id", [createPath, readFile], async (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = res.locals.users.findIndex(user => user.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.locals.users[index] = req.body;

    await fs.writeFile(
      res.locals.pathToDB,
      JSON.stringify(res.locals.users),
      "utf8"
    );

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports.usersRouter = usersRouter;

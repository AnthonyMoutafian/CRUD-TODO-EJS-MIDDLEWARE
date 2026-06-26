const express = require("express");
const {
  createPathForLoggedInUser,
  readFileForLoggedInUser,
} = require("../middleware");
const fs = require("fs").promises;

const loggedInUserRouter = express.Router();

loggedInUserRouter.get(
  "/",
  [createPathForLoggedInUser, readFileForLoggedInUser],
  async (req, res) => {
    res.json(res.locals.loggedInUser);
  },
);

loggedInUserRouter.put("/", createPathForLoggedInUser, async (req, res) => {
  try {
    await fs.writeFile(
      res.locals.pathToDBLoggedInUser,
      JSON.stringify(req.body),
      "utf8",
    );

    res.status(200).json({
      message: "Logged in user saved",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

loggedInUserRouter.patch("/", createPathForLoggedInUser, async (req, res) => {
  try {
    await fs.writeFile(
      res.locals.pathToDBLoggedInUser,
      JSON.stringify(req.body),
      "utf8",
    );

    res.status(200).json({
      message: "Logged in user updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports.loggedInUserRouter = loggedInUserRouter;

const express = require("express");
const { createPathCustom } = require("../helpers");

const loginRoute = express.Router();

loginRoute.use(express.static("view"));

loginRoute.get("/", (req, res) => {
  try {
    res.render(createPathCustom("login"));
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports.loginRoute = loginRoute
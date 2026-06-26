const express = require("express");
const { createPathCustom } = require("../helpers");

const registerRoute = express.Router();

registerRoute.use(express.static("view"));

registerRoute.get("/", (req, res) => {
  try {
    res.render(createPathCustom("register"));
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports.registerRoute = registerRoute
const express = require("express");
const { createPathCustom } = require("../helpers");

const homeRoute = express.Router();

homeRoute.use(express.static("view"));

homeRoute.get("/", (req, res) => {
  try {
    res.render(createPathCustom("index"));
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports.homeRoute = homeRoute
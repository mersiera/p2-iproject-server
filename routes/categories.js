const express = require("express");
const categories = express.Router();

categories.get("/");

module.exports = categories;

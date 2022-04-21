const express = require("express");
const historyController = require("../controllers/historyController");
const histories = express.Router();

histories.get("/", historyController.getAllHistories);

module.exports = histories;

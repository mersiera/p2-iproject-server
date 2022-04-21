const express = require("express");
const UserController = require("../controllers/controllerUser");
const users = express.Router();

users.post("/register", UserController.register);
users.post("/login", UserController.login);

module.exports = users;

const express = require("express");
const authentication = require("../midllewares/authentication");
const histories = require("./histories");
const indexRouter = express.Router();
const products = require("./products");
const users = require("./users");

indexRouter.use("/users", users);
indexRouter.use(authentication);
indexRouter.use("/products", products);
indexRouter.use("/histories", histories);

module.exports = indexRouter;

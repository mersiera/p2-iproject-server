const express = require("express");
const productController = require("../controllers/controllerProduct");
const authorization = require("../midllewares/authorization");
const products = express.Router();

products.get("/", productController.getAllProduct);
products.post("/", productController.addProduct);
products.put("/:productId", productController.buyProduct);
products.get("/:productId", productController.getProduct);
products.post("/:productId/payment", productController.paymentToken);
products.patch("/:productId", authorization, productController.changeStatus);

module.exports = products;

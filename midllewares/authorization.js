const { Product } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const { idUser } = req.user;

    const findProduct = await Product.findByPk(productId);

    if (!findProduct) {
      throw {
        name: "NotFound",
        msg: "Product Not Found",
      };
    }

    if (findProduct.UserId !== idUser) {
      throw {
        name: "Forbidden",
        msg: "You're not authorized",
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;

const { readToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readToken(access_token);

    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw {
        name: "Unauthorized",
        msg: "You're not authorized",
      };
    }

    req.user = {
      idUser: findUser.id,
      email: findUser.email,
      address: findUser.address,
      mobile: findUser.mobile,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;

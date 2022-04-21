const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, address, mobile } = req.body;

      const newUser = await User.create({ email, password, address, mobile });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw {
          name: "BadRequest",
          msg: "Email is required",
        };
      }

      if (!password) {
        throw {
          name: "BadRequest",
          msg: "Password is required",
        };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw {
          name: "Unauthorized",
          msg: "Invalid email/password",
        };
      }

      const matchPassword = comparePassword(password, findUser.password);

      if (!matchPassword) {
        throw {
          name: "Unauthorized",
          msg: "Invalid email/password",
        };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const accessToken = createToken(payload);

      res.status(200).json({ access_token: accessToken, user: payload });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

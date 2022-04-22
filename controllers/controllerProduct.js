const { Product, User, History, Category, Sequelize } = require("../models");
const { Op } = Sequelize;
const nodemailer = require("nodemailer");

class productController {
  static async getAllProduct(req, res, next) {
    try {
      const { filter } = req.query;
      const option = {};

      if (filter) {
        if (filter.category) {
          const query = filter.category.split(",").map((id) => ({
            [Op.eq]: id,
          }));

          option.where = {
            CategoryId: { [Op.or]: query },
          };
        }

        if (filter.user) {
          const query = filter.user.split(",").map((id) => ({
            [Op.eq]: id,
          }));

          option.where = {
            UserId: { [Op.like]: query },
          };
        }

        if (filter.status) {
          option.where = {
            status: { [Op.like]: filter.status },
          };
        }
      }

      option.order = [["id", "asc"]];
      const products = await Product.findAll(option);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async buyProduct(req, res, next) {
    try {
      const productId = +req.params.productId;
      const { idUser, email } = req.user;
      let { message } = req.body;
      let statusBuy;

      const findProduct = await Product.findByPk(productId);

      if (!findProduct) {
        throw {
          name: "NotFound",
          msg: "Product Not Found",
        };
      }

      const findSeller = await User.findByPk(findProduct.UserId);

      await Product.update({ UserId: idUser }, { where: { id: productId } });
      await History.create({ seller: findSeller.email, buyer: email, ProductId: productId });

      switch (message) {
        case "success":
          message = `Dear ${email}, you have success buy ${findProduct.name}!`;
          statusBuy = "Success";
          break;
        case "pending":
          message = `Dear ${email}, you have success buy ${findProduct.name}!`;
          statusBuy = "Pending";
          break;
        case "failed":
          message = `Dear ${email}, you have success buy ${findProduct.name}!`;
          statusBuy = "Failed";
          break;
        default:
          break;
      }

      // let testAccount = await nodemailer.createTestAccount();

      // let transporter = nodemailer.createTransport({
      //   service: "hotmail",
      //   auth: {
      //     user: "mersiera@hotmail", // generated ethereal user
      //     pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      //   },
      // });

      // let info = await transporter.sendMail({
      //   from: findSeller.email, // sender address
      //   to: email, // list of receivers
      //   subject: `${statusBuy} Buying ${findProduct.name} ✔`, // Subject line
      //   text: message, // plain text body
      //   html: message, // html body
      // });
      // let mailOptions = {
      //   from: findSeller.email, // sender address
      //   to: email, // list of receivers
      //   subject: `${statusBuy} Buying ${findProduct.name} ✔`, // Subject line
      //   text: message, // plain text body
      //   html: message, // html body
      // };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log("/sendmail error");
      //     console.log(error);
      //     res.sendStatus(500);
      //     return;
      //   } else {
      //     console.log("Message sent: " + info.response);
      //     // if you don't want to use this transport object anymore, uncomment following line
      //     socketTimeout: 30 * 1000; // 0.5 min: Time of inactivity until the connection is closed
      //     transporter.close(); // shut down the connection pool, no more messages
      //     res.sendStatus(200);
      //   }

      //   // if you don't want to use this transport object anymore, uncomment following line
      //   transporter.close(); // shut down the connection pool, no more messages
      // });
      // console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "success buy product" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      const productId = +req.params.productId;

      const findProduct = await Product.findByPk(productId);

      if (!findProduct) {
        throw {
          name: "NotFound",
          msg: "Product Not Found",
        };
      }

      await Product.update({ status: "available" }, { where: { id: productId } });
      res.status(200).json({ message: "success update status" });
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { idUser } = req.user;
      const { name, imgUrl, price, CategoryId } = req.body;

      const newProduct = await Product.create({
        name,
        imgUrl,
        price,
        CategoryId,
        UserId: idUser,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const productId = +req.params.productId;

      const findProduct = await Product.findByPk(productId);

      if (!findProduct) {
        throw {
          name: "NotFound",
          msg: "Product Not Found",
        };
      }

      res.status(200).json(findProduct);
    } catch (error) {
      next(error);
    }
  }

  static async paymentToken(req, res, next) {
    try {
      const { productId } = req.params;
      const midtransClient = require("midtrans-client");
      const dataUser = req.user;
      const randomCode = Math.floor(Math.random() * 50);
      const findProduct = await Product.findOne({ where: { id: productId }, include: Category });

      if (!findProduct) {
        throw {
          name: "NotFound",
          msg: "Product Not Found",
        };
      }
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: `${findProduct.name}-${randomCode}`,
          gross_amount: findProduct.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: { dataUser },
      };

      const transaction = await snap.createTransaction(parameter);
      // transaction token
      let transactionToken = transaction.token;
      let redirectUrl = transaction.redirect_url;

      res.status(200).json({ transactionToken, redirectUrl });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = productController;

require("dotenv").config();
const jwt = require("jsonwebtoken");
const privateKey = process.env.SECRET_KEY;

const createToken = (payload) => {
  return jwt.sign(payload, privateKey);
};

const readToken = (token) => {
  return jwt.verify(token, privateKey);
};

module.exports = {
  createToken,
  readToken,
};

const bcrypt = require("bcrypt");

const hashPassword = (plainText) => {
  return bcrypt.hashSync(plainText, 10);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};

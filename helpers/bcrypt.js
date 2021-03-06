var bcrypt = require("bcryptjs");

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hashPass) {
  return bcrypt.compareSync(password, hashPass);
}

module.exports = {
  hashPassword,
  comparePassword,
};

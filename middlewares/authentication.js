const { verifyToken } = require("../helpers/jwt");

function authentication(req, res, next) {
  try {
    const decoded = verifyToken(req.headers.access_token);
    req.decoded = decoded;
    next();
  } catch (error) {
    const errors = {
      name: "customError",
      status: 401,
      message: "Invalid token",
    };
    next(errors);
  }
}

module.exports = authentication;

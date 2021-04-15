const { Admin } = require("../models/index");

async function authorize(req, res, next) {
  try {
    const user = await Admin.findByPk(req.decoded.id);
    if (!user) {
      throw { name: "customError", status: 404, message: "data not found" };
    } else {
      if (req.decoded.role === "admin") next();
      else {
        throw {
          name: "customError",
          status: 401,
          message: "Unauthorized account type",
        };
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorize;

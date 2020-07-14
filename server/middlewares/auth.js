const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const { comparePwd } = require("../helpers/bcrypt");
const { Op } = require("sequelize");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;
  try {
    let decoded = verifyToken(access_token, process.env.SECRET);
    req.userId = decoded.userId;
    User.findByPk(decoded.userId)
      .then((user) => {
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    next(err);
  }
};

const adminAuthorization = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      const admin = comparePwd(process.env.ADMIN, user.role);
      if (admin) {
        next();
      } else {
        throw {
          name: "UnauthorizedError",
          statusCode: 403,
          message: "Not authorized to do this action",
        };
      }
    })
    .catch(next);
};

const customerAuthorization = (req, res, next) => {
  User.findOne({
    where: { [Op.and]: [{ id: req.userId }, { role: "customer" }] },
  })
    .then((user) => {
      if (user) {
        next();
      } else {
        throw {
          name: "UnauthorizedError",
          statusCode: 403,
          message: "Not authorized to do this action",
        };
      }
    })
    .catch(next);
};

module.exports = {
  authentication,
  adminAuthorization,
  customerAuthorization,
};

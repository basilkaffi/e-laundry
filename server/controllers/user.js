const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePwd } = require("../helpers/bcrypt");
const { Op } = require("sequelize");
const { hashPwd } = require("../helpers/bcrypt");

class UserController {
  static register(req, res, next) {
    const { name, password, email } = req.body;
    User.findOne({ where: { [Op.or]: [{ email }, { name }] } })
      .then((response) => {
        if (response) {
          throw {
            name: "BadRequestError",
            statusCode: 400,
            message: "email or username already being used",
          };
        } else {
          return User.create({
            name,
            email,
            password,
            role: "customer",
          });
        }
      })
      .then((response) => {
        res.status(201).json({
          id: response.id,
          name: response.name,
          role: response.role,
        });
      })
      .catch(next);
  }
  static loginAdmin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        const adminTrue = comparePwd(process.env.ADMIN, user.role);
        const passwordTrue = comparePwd(password, user.password);
        if (adminTrue && passwordTrue) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          throw {
            name: "BadRequestError",
            statusCode: 400,
            message: "email or password is wrong",
          };
        }
      })
      .catch(next);
  }
  static loginCustomer(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        const passwordTrue = comparePwd(password, user.password);
        if (user && passwordTrue) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          throw {
            name: "BadRequestError",
            statusCode: 400,
            message: "email or password is wrong",
          };
        }
      })
      .catch(next);
  }
  static getCustomers(req, res, next) {
    User.findAll({ where: { role: "customer" } })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }
  static updateCustomer(req, res, next) {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const hashedPwd = hashPwd(password);
    User.update({ name, email, password: hashedPwd }, { where: { id } })
      .then((response) => {
        if (response[0] === 1) {
          res.status(200).json({ message: "Customer has been updated" });
        } else {
          throw {
            name: "NotFoundError",
            message: "Customer cannot be found",
            status: 404,
          };
        }
      })
      .catch(next);
  }
  static deleteCustomer(req, res, next) {
    const { id } = req.params;
    User.destroy({
      where: { id },
    })
      .then((response) => {
        if (response === 1) {
          res.status(200).json({ message: "Customer has been deleted" });
        } else {
          throw {
            name: "NotFoundError",
            message: "Customer cannot be found",
            status: 404,
          };
        }
      })
      .catch(next);
  }
}

module.exports = UserController;

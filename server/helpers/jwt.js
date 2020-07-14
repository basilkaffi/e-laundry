const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};

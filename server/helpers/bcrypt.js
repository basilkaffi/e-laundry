const bcryptjs = require("bcryptjs");

const hashPwd = (password) => {
  const salt = bcryptjs.genSaltSync(Number(process.env.SALT));
  return bcryptjs.hashSync(password, salt);
};

const comparePwd = (password, hashedPwd) => {
  return bcryptjs.compareSync(password, hashedPwd);
};

module.exports = {
  hashPwd,
  comparePwd,
};

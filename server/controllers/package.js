const { Package } = require("../models");

class PackageController {
  static getPackages(req, res, next) {
    Package.findAll({ order: [["id", "ASC"]] })
      .then((packages) => {
        res.status(200).json(packages);
      })
      .catch(next);
  }
  static addPackage(req, res, next) {
    const { description, price } = req.body;
    Package.create({ description, price })
      .then((newPackage) => {
        res.status(201).json(newPackage);
      })
      .catch(next);
  }
  static updatePackage(req, res, next) {
    const { description, price } = req.body;
    const { id } = req.params;
    Package.update({ description, price }, { where: { id } })
      .then((response) => {
        if (response[0] === 1) {
          res.status(200).json({ message: "Package has been updated" });
        } else {
          throw {
            name: "NotFoundError",
            message: "Package cannot be found",
            status: 404,
          };
        }
      })
      .catch(next);
  }
  static deletePackage(req, res, next) {
    const { id } = req.params;
    Package.destroy({
      where: { id },
    })
      .then((response) => {
        if (response === 1) {
          res.status(200).json({ message: "Package has been deleted" });
        } else {
          throw {
            name: "NotFoundError",
            message: "Package cannot be found",
            status: 404,
          };
        }
      })
      .catch(next);
  }
}

module.exports = PackageController;

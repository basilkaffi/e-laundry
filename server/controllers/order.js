const { Order, User, Package } = require("../models");

class OrderController {
  static getMyHistory(req, res, next) {
    Order.findAll(
      { where: { UserId: req.userId } },
      {
        include: [
          {
            model: Package,
            attributes: ["name", "price", "description", "status"],
          },
        ],
      }
    )
      .then((myHistory) => {
        res.status(200).json(myHistory);
      })
      .catch(next);
  }
  static getAllOrders(req, res, next) {
    Order.findAll({
      include: [
        { model: Package, attributes: ["name", "price", "status"] },
        { model: User, attributes: ["name"] },
      ],
    })
      .then((allOrders) => {
        res.status(200).json(allOrders);
      })
      .catch(next);
  }
  static createOrder(req, res, next) {
    const { PackageId, UserId, weight } = req.body;
    Package.findOne({ where: { id: PackageId } })
      .then((response) => {
        const price = response.price * weight;
        return Order.create({
          weight,
          price,
          PackageId,
          UserId,
          status: "waiting",
        });
      })
      .then((newOrder) => {
        res.status(201).json(newOrder);
      })
      .catch(next);
  }
  static updateStatus(req, res, next) {
    const { status } = req.body;
    const { id } = req.params;
    Order.update({ status }, { where: { id } })
      .then((response) => {
        if (response[0] === 1) {
          res
            .status(200)
            .json({ message: "Order status has been updated to " + status });
        } else {
          throw {
            name: "NotFoundError",
            message: "Order cannot be found",
            status: 404,
          };
        }
      })
      .catch(next);
  }
  static deleteOrder(req, res, next) {
    const { id } = req.params;
    Order.destroy({
      where: { id },
    })
      .then((response) => {
        if (response === 1) {
          res.status(200).json({ message: "Order has been deleted" });
        } else {
          throw {
            name: "NotFoundError",
            message: "Order cannot be found",
            status: 404,
          };
        }
      })
      .catch(next);
  }
}

module.exports = OrderController;

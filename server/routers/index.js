const router = require("express").Router();
const userRouter = require("./user");
const packageRouter = require("./package");
const orderRouter = require("./order");

router.use("/user", userRouter);
router.use("/package", packageRouter);
router.use("/order", orderRouter);

module.exports = router;

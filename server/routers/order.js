const router = require("express").Router();
const controller = require("../controllers/order");
const {
  authentication,
  adminAuthorization,
  customerAuthorization,
} = require("../middlewares/auth");

router.use(authentication);
router.get("/myHistory", customerAuthorization, controller.getMyHistory);
router.get("/", adminAuthorization, controller.getAllOrders);
router.post("/", adminAuthorization, controller.createOrder);
router.put("/:id", adminAuthorization, controller.updateStatus);
router.delete("/:id", adminAuthorization, controller.deleteOrder);

module.exports = router;

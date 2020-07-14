const router = require("express").Router();
const controller = require("../controllers/user");
const {
  authentication,
  adminAuthorization,
  customerAuthorization,
} = require("../middlewares/auth");

router.post("/register", controller.register);
router.post("/loginAdmin", controller.loginAdmin);
router.post("/loginCustomer", controller.loginCustomer);
router.use(authentication);
router.get("/customers", adminAuthorization, controller.getCustomers);
router.put("/customers/:id", customerAuthorization, controller.updateCustomer);
router.delete(
  "/customers/:id",
  customerAuthorization,
  controller.deleteCustomer
);

module.exports = router;

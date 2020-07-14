const router = require("express").Router();
const controller = require("../controllers/package");
const { authentication, adminAuthorization } = require("../middlewares/auth");

router.use(authentication);
router.get("/", controller.getPackages);
router.post("/", adminAuthorization, controller.addPackage);
router.put("/:id", adminAuthorization, controller.updatePackage);
router.delete("/:id", adminAuthorization, controller.deletePackage);

module.exports = router;

const userControllers = require("../controllers/userController"); // Update the path accordingly
const auth = require("../middlewares/auth");
const imageSaver = require("../middlewares/imageSaver");
const { Router } = require("express");
const router = Router();

router.post("/signup", userControllers.Signup);
router.post("/signin", userControllers.Signin);

router.post("/product", auth, imageSaver, userControllers.createProduct);

module.exports = router;

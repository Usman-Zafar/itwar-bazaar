const auth = require("../middlewares/auth");
const sellerControllers = require("../controllers/sellerControllers");
//const { saveimage } = require("../middlewares/saveimage");

const { Router } = require("express");
//const userControllers = require("../controllers/userController");
const router = Router();

//router.post("/product", auth, userControllers.createProduct);

router.put("/product/:id", auth, sellerControllers.editProduct);

router.delete("/product/:id", auth, sellerControllers.deleteProduct);

router.get("/myOrders", auth, sellerControllers.viewOrders);

router.get("/myProducts", auth, sellerControllers.viewProduct);

router.get("/order/:id", auth, sellerControllers.editOrderStatus);

module.exports = router;

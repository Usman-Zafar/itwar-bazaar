const purchaserController = require("../controllers/purchaserControllers");
const { Router } = require("express");
const router = Router();

router.get("/product", purchaserController.viewProducts);

module.exports = router;

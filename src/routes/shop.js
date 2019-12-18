const express = require("express");

const router = express.Router();
const productsController = require("../controllers/products");
const homeController = require("../controllers/home")

router.get("/", homeController.home);
router.get("/products", productsController.getProducts);
router.get("/cart");
router.get("/checkout");
module.exports = router;

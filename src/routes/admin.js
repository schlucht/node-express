const express = require("express");

const router = express.Router();
const productsController = require("../controllers/products");
// /admin/add-product
const products = [];

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);
// /admin/products => GET
router.get("/products");

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

module.exports = router;

const Product = require("../models/product");

exports.home = (req, res, next) =>{
    Product.fetchAll(products => {
      res.render("home/index", {
        prods: products,
        pageTitle: "My Book Shop",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
  }
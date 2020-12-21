// /admin/add-product

const Product = require("../models/product");
const Cart = require("../models/cart");

// exports.getAdminProduct = (req, res, next) => {
//   res.render("admin/products", {
//     pageTitle: "Admin Product",
//     path: "admin/products",
//     formsCSS: true,
//     productCSS: true,
//     activeAddProduct: true
//   });
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "shop/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, prod => {
    res.render('shop/product-detail', {
      product: prod,
      pageTitle: 'Produktdetail',
      path:"/products"
    })
  });
  
  // res.redirect('/');
}
exports.getIndex = (req, res, next) =>{
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
}
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, prod => {
    Cart.addProduct(prodId, prod.price)
  })
  res.redirect('/cart')
}
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};
exports.getOrders = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, prod => {
    res.render('shop/orders', {
      product: prod,
      pageTitle: 'Meine Bestellungen',
      path:"/orders"
    })
  })
}
exports.getCheckout = (req, res, next) => {
  res.render('/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}


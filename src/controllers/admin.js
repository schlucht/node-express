const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
      res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId, prod => {
      if (!prod) {
        return res.redirect('/')
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        product: prod,
        editing: editMode,
      });
    })
}
exports.postEditProduct = ( req, res, next) => {
  const prodid = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(prodid, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
}
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { 
    pageTitle: 'Neues Produkt',
    path: '/admin/add-product',
    editing: false
  })
}
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
        });
      });
}
exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;  
  Product.delete(prodId)
  res.redirect('/admin/products')
}
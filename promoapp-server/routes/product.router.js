const express = require("express");
const { check } = require("express-validator");
const Product = require("../models/Product.js");
const router = express.Router();

const authController = require("../controllers/auth.controller.js");
const productController = require("../controllers/product.controller.js");

// GET : api/v1/product
// POST : api/v1/product
router
  .route("")
  .get(productController.getProducts)
  .post(
    [
      check("slug").custom((value, { req }) => {
        return Product.findOne({ slug: value }).then((productDoc) => {
          if (productDoc) return Promise.reject("Product already exists!!!");
        });
      }),
      check("title").not().isEmpty().withMessage("Title is required."),
    ],
    authController.onlyAuthUser,
    authController.onlyAdmin,
    productController.createProduct
  );

// GET : api/v1/product/:id
// PATCH : api/v1/product/:id
router
  .route("/:id")
  .get(productController.getProductById)
  .patch(
    authController.onlyAuthUser,
    authController.onlyAdmin,
    productController.updateProduct
  );

// GET : api/v1/product/s/:slug
router.get("/s/:slug", productController.getProductBySlug);

// GET : api/v1/product/user-products
router.get(
  "/user-products",
  authController.onlyAuthUser,
  authController.onlyAdmin,
  productController.getInstructorProducts
);

module.exports = router;

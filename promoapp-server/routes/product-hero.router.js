const express = require("express");
const productHeroController = require("../controllers/product-hero.controller.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

// GET : /api/v1/product-hero
// POST : /api/v1/product-hero
router
  .route("")
  .get(
    authController.onlyAuthUser,
    authController.onlyAdmin,
    productHeroController.getProductHero
  )
  .post(productHeroController.createHero);

// PATCH : /api/v1/product-hero/id
router
  .route("/:id")
  .patch(
    authController.onlyAuthUser,
    authController.onlyAdmin,
    productHeroController.updateProductHero
  );

module.exports = router;

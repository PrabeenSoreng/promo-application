const express = require("express");
const categoryController = require("../controllers/category.controller.js");

const router = express.Router();

// GET : /api/v1/category
router.get("", categoryController.getCategories);

module.exports = router;

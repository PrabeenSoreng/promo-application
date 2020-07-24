const express = require("express");
const apiController = require("../controllers/api.controller.js");
const router = express.Router();

router.get("", apiController.getPageData);

module.exports = router;

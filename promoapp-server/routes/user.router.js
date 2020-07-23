const express = require("express");
const { check } = require("express-validator");
const User = require("../models/User.js");
const userController = require("../controllers/user.controller.js");

const router = express.Router();

// POST : api/v1/user/signup
router.post(
  "/signup",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please enter a valid Email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) return Promise.reject("Email already exists!!!");
        });
      })
      .normalizeEmail(),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required.")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum length required is 6"),
    check("role").not().isEmpty(),
  ],
  userController.register
);

// POST : api/v1/user/login
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please enter valid Email.")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("Password is required."),
  ],
  userController.login
);

router.post("/logout", userController.logout);

module.exports = router;

const passport = require("passport");
const User = require("../models/User.js");
const catchAsync = require("../util/catchAsync.js");
const { inputValidationErrors } = require("../util/catchError.js");

exports.getCurrentUser = catchAsync(async (req, res, next) => {});

exports.signup = catchAsync(async (req, res, next) => {
  inputValidationErrors(req, res);
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: "success",
    message: "User created successfully",
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {});

exports.logout = (req, res, next) => {};

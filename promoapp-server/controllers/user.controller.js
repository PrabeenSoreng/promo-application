const passport = require("passport");
const User = require("../models/User.js");
const catchAsync = require("../util/catchAsync.js");

exports.getCurrentUser = catchAsync(async (req, res, next) => {});

exports.register = catchAsync(async (req, res, next) => {});

exports.login = catchAsync(async (req, res, next) => {});

exports.logout = (req, res, next) => {};

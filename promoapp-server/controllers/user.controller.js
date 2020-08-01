const passport = require("passport");
const User = require("../models/User.js");
const catchAsync = require("../util/catchAsync.js");
const { inputValidationErrors } = require("../util/catchError.js");

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) return res.sendStatus(422);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  inputValidationErrors(req, res);
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: "success",
    message: "User created successfully",
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  inputValidationErrors(req, res);
  return passport.authenticate("local", (err, passportUser) => {
    if (err) return next(err);

    if (passportUser) {
      req.login(passportUser, function (err) {
        if (err) next(err);

        let user = {
          ...passportUser._doc,
        };
        delete user.__v;
        delete user.password;
        return res.status(200).json({
          status: "success",
          message: "Login successful.",
          data: user,
        });
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message: "Invalid Email or password.",
      });
    }
  })(req, res, next);

  // const passportUser = await passport.authenticate("local")(req, res, next);

  // res.status(200).json({
  //   message: "Login successful.",
  //   user: passportUser,
  // });
});

exports.logout = (req, res, next) => {
  req.logout();
  return res.json({ status: "Session destroyed!" });
};

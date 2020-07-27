const Categoty = require("../models/Category.js");
const catchAsync = require("../util/catchAsync.js");
const { AppError } = require("../util/catchError");

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Categoty.find();
  if (!categories) return next(new AppError("No categories found!!!", 404));

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

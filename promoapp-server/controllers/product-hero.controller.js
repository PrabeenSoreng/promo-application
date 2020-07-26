const ProductHero = require("../models/ProductHero.js");
const { AppError } = require("../util/catchError.js");
const catchAsync = require("../util/catchAsync.js");

exports.createHero = catchAsync(async (req, res, next) => {
  const createdHero = await ProductHero.create(req.body);

  res.status(200).json({
    status: "success",
    data: createdHero,
  });
});

exports.getProductHero = catchAsync(async (req, res, next) => {
  const heroes = await ProductHero.find()
    .populate("product")
    .sort({ createdAt: -1 });
  if (!heroes) return next(new AppError("Data not available.", 404));

  return res.status(200).json({
    status: "success",
    data: heroes,
  });
});

exports.updateProductHero = catchAsync(async (req, res, next) => {
  const hero = await ProductHero.findById(id).populate("product");
  if (!hero) return next(new AppError("Data not available.", 404));

  hero.set({ createdAt: new Date() });
  const updatedHero = await hero.save();

  res.status(200).json({
    status: "success",
    data: updatedHero,
  });
});

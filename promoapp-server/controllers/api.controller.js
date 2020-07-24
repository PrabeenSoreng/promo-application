const ProductHero = require("../models/ProductHero.js");
const catchAsync = require("../util/catchAsync.js");

exports.getPageData = catchAsync(async (req, res, next) => {
  const productHero = await ProductHero.findOne()
    .sort({ createdAt: -1 })
    .populate("product");
  return res.status(200).json({
    status: "success",
    data: productHero,
  });
});

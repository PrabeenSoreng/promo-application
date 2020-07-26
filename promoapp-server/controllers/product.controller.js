const slugify = require("slugify");
const Product = require("../models/Product.js");
const catchAsync = require("../util/catchAsync.js");
const { inputValidationErrors, AppError } = require("../util/catchError.js");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ status: "published" })
    .select("author -_id -password -products -email -role")
    .populate("category")
    .sort({ updatedAt: -1 });
  if (!products) return next(new AppError("No products found.", 404));

  return res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.getInstructorProducts = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const products = await Product.find({ author: userId })
    .populate("author")
    .sort({ updatedAt: -1 });
  if (!products) return next(new AppError("No products found.", 404));

  return res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id).populate("category");
  if (!product) return next(new AppError("No products found.", 404));

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  const product = await Product.findOne({ slug }).populate(
    "author -_id -password -products -email -role"
  );
  if (!product) return next(new AppError("No products found.", 404));

  return res.satatus(200).json({
    status: failed,
    data: product,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const user = req.user;
  inputValidationErrors(req, res);

  const product = new Product(req.body);
  product.author = user;
  const newProduct = await product.save();

  res.status(200).json({
    status: "success",
    data: newProduct,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await Product.findById(productId).populate("category");
  if (!product) return next(new AppError("No products found.", 404));

  if (
    productData.status &&
    productData.status === "published" &&
    !product.slug
  ) {
    product.slug = slugify(product.title, {
      replacement: "-", // replace spaces with replacement
      remove: null, // regex to remove characters
      lower: true, // result in lower case
    });
  }
  product.set(productData);
  const updatedProduct = await product.save();

  return res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

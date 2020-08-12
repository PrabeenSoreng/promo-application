const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  slug: {
    type: String,
    sparse: true,
  },
  title: {
    type: String,
  },
  subtitle: String,
  image: String,
  description: String,
  rating: Number,
  //what students learn
  wsl: [{ type: mongoose.Schema.Types.Mixed, value: String }],
  requirements: [{ type: mongoose.Schema.Types.Mixed, value: String }],
  promoVideoLink: String,
  productLink: String,
  price: Number,
  discountedPrice: Number,
  status: {
    type: String,
    enum: ["active", "inactive", "deleted", "published"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

module.exports = mongoose.model("Product", productSchema);

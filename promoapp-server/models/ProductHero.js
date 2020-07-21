const mongoose = require("mongoose");

const productHeroSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  image: String,
  title: String,
  subtitle: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ProductHero", productHeroSchema);

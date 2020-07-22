const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  slug: { type: String, unique: true, sparse: true },
  title: { type: String, maxlength: 96 },
  subtitle: String,
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  featured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted", "published"],
    default: "active",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Blog", blogSchema);

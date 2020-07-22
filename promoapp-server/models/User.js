const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  avatar: String,
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  name: {
    type: String,
    required: true,
    minlength: [6, "Too short, min is 6 characters."],
  },
  username: {
    type: String,
    required: true,
    minlength: [6, "Too short, min is 6 characters."],
  },
  password: {
    type: String,
    minlength: [4, "Too short, min is 4 characters."],
    maxlength: [32, "Too long, max is 32 characters."],
    required: "Password is required.",
  },
  role: {
    type: String,
    enum: ["guest", "admin"],
    required: true,
    default: "guest",
  },
  info: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);

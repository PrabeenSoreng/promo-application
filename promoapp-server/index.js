const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user.router.js");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/random", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the promo app API.",
  });
});

app.use("/api/v1/user", userRoutes);

app.use((error, req, res, next) => {
  console.log("ERROR", error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message, data });
});

module.exports = app;

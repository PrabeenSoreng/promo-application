const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

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

module.exports = app;

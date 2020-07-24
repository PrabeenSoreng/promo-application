const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user.router.js");
const apiRoutes = require("./routes/api.router.js");

require("./services/passport.js");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 2 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
};

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
//   sess.cookie.secure = true;
//   sess.cookie.httpOnly = true;
//   sess.cookie.sameSite = true;
//   sess.cookie.domain = process.env.DOMAIN // .yourdomain.com
// }

app.use(passport.initialize());
app.use(passport.session());
app.use(session(sess));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/random", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the promo app API.",
  });
});

app.use("/api/v1/", apiRoutes);
app.use("/api/v1/user", userRoutes);

app.use((error, req, res, next) => {
  console.log("ERROR", error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message, data });
});

module.exports = app;

const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user.router.js");
const apiRoutes = require("./routes/api.router.js");
const productRoutes = require("./routes/product.router.js");
const productHeroRoutes = require("./routes/product-hero.router.js");
const categoryRouters = require("./routes/category.router.js");
const blogRouter = require("./routes/blog.router.js");
const mongoSession = require("./util/mongoSession.js");

require("./services/passport.js");

const app = express();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const store = mongoSession.initSessionStore();

const sess = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  store,
};

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
//   sess.cookie.secure = true;
//   sess.cookie.httpOnly = true;
//   sess.cookie.sameSite = true;
//   sess.cookie.domain = process.env.DOMAIN // .yourdomain.com
// }

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/product-hero", productHeroRoutes);
app.use("/api/v1/category", categoryRouters);
app.use("/api/v1/blog", blogRouter);

app.use((error, req, res, next) => {
  console.log("ERROR", error);
  const statusCode = error.statusCode || 500;
  const status = error.status;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ status, message, data });
});

module.exports = app;

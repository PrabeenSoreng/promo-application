exports.onlyAuthUser = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({
    status: "failed",
    message: "Not authenticated.",
  });
};

exports.onlyAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user["role"] === "admin") return next();
  return res.status(401).json({
    status: "failed",
    message: "Not authenticated.",
  });
};

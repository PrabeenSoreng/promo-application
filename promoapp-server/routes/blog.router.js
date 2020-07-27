const express = require("express");
const blogController = require("../controllers/blog.controller.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

// GET : /api/v1/blog
// POST : /api/v1/blog
router
  .route("")
  .get(blogController.getBlgs)
  .post(
    authController.onlyAuthUser,
    authController.onlyAdmin,
    blogController.createBlog
  );

// GET : /api/v1/blog/me
router.get(
  "/me",
  authController.onlyAuthUser,
  authController.onlyAdmin,
  blogController.getUserBlogs
);

// GET : /api/v1/blog/medium
router.get("/medium", blogController.getMediumBlogs);

// GET : /api/v1/blog/:id
// PATCH : /api/v1/blog/:id
// DELETE : /api/v1/blog/:id
router
  .route("/:id")
  .get(blogController.getBlogById)
  .patch(
    authController.onlyAuthUser,
    authController.onlyAdmin,
    blogController.updateBlogs
  )
  .delete(
    authController.onlyAuthUser,
    authController.onlyAdmin,
    blogController.deleteBlog
  );

// GET : /api/v1/blog/s/:slug
router.get("/s/:slug", blogController.getBlogBySlug);

module.exports = router;

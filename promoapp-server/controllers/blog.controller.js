const Blog = require("../models/Blog.js");
const slugify = require("slugify");
const request = require("request");
const AsyncLock = require("async-lock");
const lock = new AsyncLock();
const { inputValidationErrors, AppError } = require("../util/catchError.js");
const catchAsync = require("../util/catchAsync.js");

const MEDIUM_URL = "https://medium.com/@filipjerga/latest?format=json&limit=20";

function parseFilters(queries) {
  const parsedQueries = {};
  if (queries.filter) {
    Object.keys(queries).forEach((qKey) => {
      if (qKey.includes("filter")) {
        const pKey = qKey.match(/\[([^)]+)\]/)[1];
        parsedQueries[pKey] = queries[qKey];
      }
    });
  }
  return parsedQueries;
}

exports.getBlogs = catchAsync(async (req, res, next) => {
  const pageSize = parseInt(req.query.pageSize) || 0;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const skips = pageSize * (pageNum - 1);
  const filters = req.query.filter || {};

  const publishedBlogs = await Blog.find({ status: "published", ...filters })
    .sort({ createdAt: -1 })
    .populate("author -_id -password -products -email -role")
    .skip(skips)
    .limit(pageSize);
  if (!publishedBlogs) return next(new AppError("Blogs not found!!!", 404));

  const count = await Blog.count({ status: "published" });

  res.status(200).json({
    status: "success",
    data: publishedBlogs,
    count,
    pageCount: Math.ceil(count / pageSize),
  });
});

exports.getMediumBlogs = catchAsync(async (req, res, next) => {
  request.get(MEDIUM_URL, (err, apiRes, body) => {
    if (!err && apiRes.statusCode === 200) {
      let i = body.indexOf("{");
      const data = body.substr(i);
      res.send(data);
    } else {
      res.sendStatus(500).json(err);
    }
  });
});

exports.getBlogBySlug = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate(
    "author -_id -password -products -email -role"
  );
  if (!blog) return next(new AppError("Blog not found!!!", 404));

  res.status(200).json({
    status: "failed",
    data: blog,
  });
});

exports.getBlogById = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return next(new AppError("Blog not found!!!", 404));

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

exports.getUserBlogs = catchAsync(async (req, res, next) => {
  const blog = await Blog.find({ author: req.user.id });
  if (!blog) return next(new AppError("Blog not found!!!", 404));

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

exports.updateBlogs = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const blogData = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) return next(new AppError("Blog not found!!!", 404));

  if (blogData.status && blogData.status === "published" && !blog.slug) {
    blog.slug = slugify(blog.title, {
      replacement: "-", // replace spaces with replacement
      remove: null, // regex to remove characters
      lower: true, // result in lower case
    });
  }

  blog.set(blogData);
  blog.updatedAt = new Date();
  const updatedBlog = await blog.save();

  res.status(200).json({
    status: "success",
    data: updatedBlog,
  });
});

exports.createBlog = (req, res, next) => {
  const lockId = req.query.lockId;

  if (!lock.isBusy(lockId)) {
    lock.acquire(
      lockId,
      function (done) {
        const blogData = req.body;
        const blog = new Blog(blogData);
        blog.author = req.user;

        blog.save((errors, createdBlog) => {
          setTimeout(() => done(), 5000);

          if (errors) return next(new AppError("Blog not found!!!", 404));

          return res.status(200).json({
            status: "success",
            data: createdBlog,
          });
        });
      },
      function (errors, ret) {
        errors && console.error(errors);
      }
    );
  } else {
    return res.status(422).send({ message: "Blog is getting saved!" });
  }
};

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return next(new AppError("No document found with that ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

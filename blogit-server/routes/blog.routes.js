const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const blogController = require("../controllers/blog.controller");

router.post("/", authenticate, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:blogId", blogController.getBlogById);
router.patch("/:blogId", authenticate, blogController.updateBlog);
router.delete("/:blogId", authenticate, blogController.deleteBlog);

module.exports = router;

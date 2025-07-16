const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const authenticate = require("../middlewares/auth.middleware");
const blogController = require("../controllers/blog.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", authenticate, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:blogId", blogController.getBlogById);
router.patch(
  "/:blogId",
  authenticate,
  upload.single("featuredImg"),
  blogController.updateBlog
);
router.delete("/:blogId", authenticate, blogController.deleteBlog);

module.exports = router;

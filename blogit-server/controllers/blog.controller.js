const { PrismaClient } = require("@prisma/client");
const { marked } = require("marked");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

exports.createBlog = async (req, res) => {
  const { title, synopsis, content, featuredImg } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: userId missing from token" });
  }

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        author: {
          connect: { id: userId },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("❌ Blog creation error:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    const formatted = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      synopsis: blog.synopsis,
      featuredImg: blog.featuredImg,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: {
        name: `${blog.author.firstName} ${blog.author.lastName}`,
        avatar:
          `${blog.author.firstName[0]}${blog.author.lastName[0]}`.toUpperCase(),
      },
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to load blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  const blogId = parseInt(req.params.blogId);

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      id: blog.id,
      title: blog.title,
      featuredImg: blog.featuredImg,
      synopsis: blog.synopsis,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      content: blog.content,
      author: {
        name: `${blog.author.firstName} ${blog.author.lastName}`,
        avatar:
          `${blog.author.firstName[0]}${blog.author.lastName[0]}`.toUpperCase(),
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateBlog = async (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const userId = req.user.userId;

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog || blog.authorId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, synopsis, content } = req.body;
    let featuredImg = blog.featuredImg;

    if (req.file) {
     if (featuredImg) {
  const imagePath = path.join(__dirname, "..", "public", featuredImg);
  if (fs.existsSync(imagePath)) {
    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.warn("⚠️ Failed to delete old image:", err.message);
    }
  }
}

      featuredImg = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: { title, synopsis, content, featuredImg },
    });

    res.json(updatedBlog);
  } catch (err) {
    console.error("❌ Error updating blog:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const userId = req.user.userId;

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.authorId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    await prisma.blog.update({
      where: { id: blogId },
      data: { isDeleted: true, updatedAt: new Date() },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Blog delete error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

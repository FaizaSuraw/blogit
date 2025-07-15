const { PrismaClient } = require('@prisma/client');
const { marked } = require('marked');
const prisma = new PrismaClient();

// ✅ Create a new blog
exports.createBlog = async (req, res) => {
  const { title, synopsis, content, featuredImg } = req.body;
  const userId = req.user.userId; // ✅ from token

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        authorId: userId,
      }
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ Get all non-deleted blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    const formatted = blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      synopsis: blog.synopsis,
      featuredImg: blog.featuredImg,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: {
        name: `${blog.author.firstName} ${blog.author.lastName}`,
        avatar: `${blog.author.firstName[0]}${blog.author.lastName[0]}`.toUpperCase()
      }
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to load blogs' });
  }
};

// ✅ Get a single blog (with markdown rendered)
exports.getBlogById = async (req, res) => {
  const blogId = parseInt(req.params.blogId);

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const htmlContent = marked(blog.content);

    res.json({
      id: blog.id,
      title: blog.title,
      featuredImg: blog.featuredImg,
      synopsis: blog.synopsis,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      content: htmlContent,
      author: {
        name: `${blog.author.firstName} ${blog.author.lastName}`,
        avatar: `${blog.author.firstName[0]}${blog.author.lastName[0]}`.toUpperCase()
      }
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ Update a blog
exports.updateBlog = async (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const userId = req.user.userId; // ✅ fix here

  const { title, synopsis, content, featuredImg } = req.body;

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        updatedAt: new Date(),
      },
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error('Blog update error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ Delete a blog (soft delete)
exports.deleteBlog = async (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const userId = req.user.userId; // ✅ fix here

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

    await prisma.blog.update({
      where: { id: blogId },
      data: { isDeleted: true, updatedAt: new Date() },
    });

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Blog delete error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

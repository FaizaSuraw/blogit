const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get current user's profile
exports.getProfile = async (req, res) => {
  try {
    console.log("🔐 Authenticated user:", req.user); // Add this

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        blogs: {
          where: { isDeleted: false },
          select: {
            id: true,
            title: true,
            synopsis: true,
            featuredImg: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    console.error("❌ getProfile error:", error); // Add this
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update current user's profile
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, username, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, username, email },
    });

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

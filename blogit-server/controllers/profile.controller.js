const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.getProfile = async (req, res) => {
  try {
    console.log("Authenticated user:", req.user);

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
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
    console.error("❌ getProfile error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.userId;
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

const bcrypt = require("bcryptjs");

exports.updatePassword = async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Both fields are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Error updating password:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

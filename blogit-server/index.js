const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const testRoutes = require("./routes/test.routes");
app.use("/api/test", testRoutes);

const blogRoutes = require("./routes/blog.routes");
app.use("/api/blogs", blogRoutes);

const uploadRoutes = require("./routes/upload.routes");
// Serve static files
app.use("/uploads", express.static("uploads"));

// Upload route
app.use("/api/upload", uploadRoutes);
const profileRoutes = require("./routes/profile.routes");
app.use("/api/profile", profileRoutes);

// Import routes
const authRoutes = require("./routes/auth.routes");

// Use routes
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("BlogIt API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

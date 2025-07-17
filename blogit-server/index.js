const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const path = require("path");

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: "https://blogit-seven.vercel.app"
}));
app.use(express.json());

const testRoutes = require("./routes/test.routes");
app.use("/api/test", testRoutes);

const blogRoutes = require("./routes/blog.routes");
app.use("/api/blogs", blogRoutes);

const uploadRoutes = require("./routes/upload.routes");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api/upload", uploadRoutes);
const profileRoutes = require("./routes/profile.routes");
app.use("/api/profile", profileRoutes);

app.use('/api/profile', require('./routes/profile.routes'));

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("BlogIt API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

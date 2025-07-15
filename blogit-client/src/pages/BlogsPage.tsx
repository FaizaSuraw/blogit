// src/pages/BlogsPage.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  Avatar,
  Box,
  TextField,
  CardMedia,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
}


export default function BlogsPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    featuredImg: "",
    content: "",
  });
  const [previewURL, setPreviewURL] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to load blogs", err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
      setForm({ ...form, featuredImg: url });
    }
  };

  const handleSubmit = async () => {
    if (!token) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        await axios.patch(`/api/blogs/${editingId}`, form, config);
        setEditingId(null);
      } else {
        await axios.post("/api/blogs", form, config);
      }

      setForm({ title: "", synopsis: "", featuredImg: "", content: "" });
      setPreviewURL("");
      fetchBlogs();
    } catch (err) {
      console.error("Failed to save blog", err);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      synopsis: blog.synopsis,
      content: blog.content || "",
      featuredImg: blog.featuredImg || "",
    });
    setPreviewURL(blog.featuredImg || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const avatarInitials = (name: string) => {
    const [f, l] = name.split(" ");
    return (f?.[0] ?? "") + (l?.[0] ?? "");
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BlogIt
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 6 }}>
        {/* Blog Creation/Edit Form */}
        <Typography variant="h4" mb={2}>
          {editingId ? "Edit Blog" : "Create New Blog"}
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="Synopsis"
              fullWidth
              multiline
              rows={2}
              value={form.synopsis}
              onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
            />
            <TextField
              label="Featured Image URL"
              fullWidth
              value={form.featuredImg}
              onChange={(e) =>
                setForm({ ...form, featuredImg: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button component="label" variant="outlined" size="small">
                      Upload
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            {previewURL && (
              <CardMedia
                component="img"
                image={previewURL}
                alt="Preview"
                sx={{ height: 180, borderRadius: 2 }}
              />
            )}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!form.title || !form.synopsis || !form.featuredImg}
              >
                {editingId ? "Save Changes" : "Post Blog"}
              </Button>
              {editingId && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      synopsis: "",
                      featuredImg: "",
                      content: "",
                    });
                    setPreviewURL("");
                  }}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>

        {/* Blog List */}
        <Typography variant="h4" mb={2}>
          Latest Blogs
        </Typography>

        {blogs.length === 0 ? (
          <Typography>No blogs available.</Typography>
        ) : (
          <Stack spacing={4}>
            {blogs.map((blog) => (
              <Paper
                key={blog.id}
                elevation={2}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 2,
                  "&:hover": { boxShadow: 6 },
                }}
              >
                {blog.featuredImg && (
                  <CardMedia
                    component="img"
                    src={blog.featuredImg}
                    alt={blog.title}
                    sx={{
                      width: { xs: "100%", sm: 250 },
                      height: { xs: 180, sm: "auto" },
                      objectFit: "cover",
                    }}
                  />
                )}
                <Box sx={{ flex: 1, p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {blog.synopsis}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Avatar sx={{ width: 28, height: 28, mr: 1 }}>
                      {avatarInitials(blog.author.name)}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {blog.author.name}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => handleEdit(blog)}
                    sx={{ mt: 1 }}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

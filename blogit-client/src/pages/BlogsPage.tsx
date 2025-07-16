import React, { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Stack,
  Box,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Modal,
  IconButton,
  CssBaseline,
  Input,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

const backendBaseURL = "http://localhost:5000";

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState({ title: "", synopsis: "", content: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${backendBaseURL}/api/blogs`);
      setBlogs(res.data);
    } catch {
      setError("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCreateOrUpdateBlog = async () => {
    if (!form.title || !form.synopsis || !form.content) {
      toast.warning("Please fill in all blog fields");
      return;
    }

    try {
      setLoading(true);
      let featuredImg = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const res = await axios.post(`${backendBaseURL}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        featuredImg = res.data.url;
      }

      const blogData = {
        ...form,
        ...(featuredImg && { featuredImg }),
      };

      if (isEditing && editingBlogId !== null) {
        await axios.put(`${backendBaseURL}/api/blogs/${editingBlogId}`, blogData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ Blog updated successfully");
      } else {
        await axios.post(`${backendBaseURL}/api/blogs`, blogData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ Blog posted successfully");
      }

      setForm({ title: "", synopsis: "", content: "" });
      setImageFile(null);
      setIsEditing(false);
      setEditingBlogId(null);
      fetchBlogs();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error("❌ Error saving blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setForm({ title: blog.title, synopsis: blog.synopsis, content: blog.content });
    setIsEditing(true);
    setEditingBlogId(blog.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (blogId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      await axios.delete(`${backendBaseURL}/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("🗑️ Blog deleted");
      fetchBlogs();
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <CssBaseline />
      <ToastContainer position="bottom-right" />
      <AppBar position="sticky" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BlogIt
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h5" mb={2}>
            {isEditing ? "✏️ Edit Blog" : "📝 Create New Blog"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="synopsis"
              label="Synopsis"
              value={form.synopsis}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="content"
              label="Content (Markdown)"
              value={form.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
            <Input type="file" onChange={handleImageUpload} />
            <Button variant="contained" onClick={handleCreateOrUpdateBlog} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : isEditing ? "Update Blog" : "Publish Blog"}
            </Button>
          </Stack>
        </Paper>

        <Typography variant="h4" mb={2} align="left">
          📰 Latest Blogs
        </Typography>
        {error && <Typography color="error">{error}</Typography>}

        <Stack direction="row" flexWrap="wrap" gap={3} useFlexGap justifyContent="flex-start">
          {blogs.map((blog) => (
            <Box
              key={blog.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                flexGrow: 1,
              }}
            >
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={`${backendBaseURL}${blog.featuredImg}`}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ⏰ {new Date(blog.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {blog.synopsis}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Avatar>{blog.author.name.charAt(0)}</Avatar>
                    <Typography variant="body2">{blog.author.name}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button onClick={() => setSelectedBlog(blog)} size="small">
                      Read More
                    </Button>
                    <Button onClick={() => handleEdit(blog)} size="small" color="primary" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(blog.id)} size="small" color="error" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Read More Modal */}
      <Modal open={!!selectedBlog} onClose={() => setSelectedBlog(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: 800,
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: 24,
          }}
        >
          {selectedBlog && (
            <>
              <Typography variant="h4">{selectedBlog.title}</Typography>
              <img
                src={`${backendBaseURL}${selectedBlog.featuredImg}`}
                alt={selectedBlog.title}
                style={{
                  width: "60%",
                  borderRadius: 10,
                  display: "block",
                  margin: "20px auto",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Typography variant="subtitle1" mt={2} color="text.secondary">
                {selectedBlog.synopsis}
              </Typography>
              <Box mt={2}>
                <ReactMarkdown>{selectedBlog.content}</ReactMarkdown>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogsPage;

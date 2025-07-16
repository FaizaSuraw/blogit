import React, { useEffect, useState, type ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Stack,
  Box,
  Card,
  CardMedia,
  CardContent,
  
  IconButton,
  Container,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  createdAt: string;
}

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const backendBaseURL = "http://localhost:5000";

const ProfilePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${backendBaseURL}/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setBlogs(res.data.blogs); // assuming backend returns both
    } catch {
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleUserUpdate = async () => {
    try {
      await axios.put(`${backendBaseURL}/api/users/update`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ User info updated");
    } catch {
      toast.error("❌ Failed to update user info");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
        return toast.warning("Please fill both password fields");
      }

      await axios.put(`${backendBaseURL}/api/users/password`, passwordForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🔐 Password updated");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updating password");
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${backendBaseURL}/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Blog deleted");
      fetchUserData();
    } catch {
      toast.error("Error deleting blog");
    }
  };

  const handleEditBlog = (blogId: number) => {
    navigate(`/edit/${blogId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <ToastContainer />
      <AppBar position="sticky" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

             <Typography variant="h5" mb={2}>📝 My Blogs</Typography>
        <Stack spacing={3}>
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardMedia
                component="img"
                height="160"
                image={`${backendBaseURL}${blog.featuredImg}`}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.synopsis}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(blog.createdAt).toLocaleString()}
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    onClick={() => handleEditBlog(blog.id)}
                    color="primary"
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteBlog(blog.id)}
                    color="error"
                    startIcon={<DeleteIcon />}
                    size="small"
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

      <Container maxWidth="md">
        {/* Personal Info Update */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">🧑 Update Personal Info</Typography>
          <Stack spacing={2} mt={2}>
            <TextField name="firstName" label="First Name" value={user.firstName} onChange={handleUserChange} />
            <TextField name="lastName" label="Last Name" value={user.lastName} onChange={handleUserChange} />
            <TextField name="username" label="Username" value={user.username} onChange={handleUserChange} />
            <TextField name="email" label="Email" value={user.email} onChange={handleUserChange} />
            <Button variant="contained" onClick={handleUserUpdate}>Update Info</Button>
          </Stack>
        </Paper>

        {/* Password Update */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">🔐 Change Password</Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
            <Button variant="contained" onClick={handlePasswordUpdate}>Update Password</Button>
          </Stack>
        </Paper>

      </Container>
    </Box>
  );
};

export default ProfilePage;

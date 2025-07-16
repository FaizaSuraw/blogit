import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Container,
  Stack,
  Paper,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendBaseURL = "http://localhost:5000";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({
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

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backendBaseURL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setForm({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        email: res.data.email,
      });
    } catch (err) {
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.patch(`${backendBaseURL}/api/profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await axios.patch(
        `${backendBaseURL}/api/profile/update-password`,
        passwordForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Password updated");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to update password",
      );
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    const confirm = window.confirm("Delete this blog?");
    if (!confirm) return;
    try {
      await axios.delete(`${backendBaseURL}/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Blog deleted");
      fetchProfile();
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const handleEditBlog = (blogId: number) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/blogs")}>
            Blogs
          </Button>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => navigate("/blogs")}
          >
            Create Blog
          </Button>
          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <ToastContainer position="bottom-right" />
        <Typography variant="h4" gutterBottom mb={1}>
          MY BLOGS
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={3} mb={4}>
          {profile?.blogs?.map((blog: any) => (
            <Card
              key={blog.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="140"
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
                    size="small"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteBlog(blog.id)}
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h6">Update Profile Info</Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleProfileChange}
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleProfileChange}
            />
            <TextField
              name="username"
              label="Username"
              value={form.username}
              onChange={handleProfileChange}
            />
            <TextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleProfileChange}
            />
            <Button variant="contained" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </Stack>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h6">Update Password</Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              name="currentPassword"
              label="Current Password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
            <Button variant="contained" onClick={handleUpdatePassword}>
              Change Password
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;

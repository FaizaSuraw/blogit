import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const backendBaseURL = "http://localhost:5000";

const EditBlogPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    content: "",
    featuredImg: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendBaseURL}/api/blogs/${id}`);
        const { title, synopsis, content, featuredImg } = res.data;
        setForm({ title, synopsis, content, featuredImg });
        setPreview(`${backendBaseURL}${featuredImg}`);
      } catch {
        alert("Error fetching blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("synopsis", form.synopsis);
      formData.append("content", form.content);
      if (imageFile) {
        formData.append("featuredImg", imageFile);
      }

      await axios.patch(`${backendBaseURL}/api/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog updated successfully");
      navigate("/profile");
    } catch (err) {
      alert("Error updating blog");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/profile")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Edit Blog
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Edit Your Blog Post
        </Typography>

        <Stack spacing={3}>
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
            label="Content"
            multiline
            rows={8}
            value={form.content}
            onChange={handleChange}
            fullWidth
          />

          {preview && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Featured Image Preview
              </Typography>
              <Avatar
                variant="rounded"
                src={preview}
                alt="Featured"
                sx={{ width: "100%", height: 200 }}
              />
            </Box>
          )}

          <Button variant="outlined" component="label">
            Upload New Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default EditBlogPage;

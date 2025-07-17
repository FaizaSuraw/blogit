import type React from "react"
import { useEffect, useState, type ChangeEvent } from "react"
import axios from "axios"
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
  Container,
  Paper,
  CircularProgress,
  Divider,
  InputAdornment,
  Fade,
  Tabs,
  Tab,
  Grid,
} from "@mui/material"
import {
  Logout as LogoutIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Image as ImageIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Blog {
  id: number
  title: string
  synopsis: string
  content: string
  featuredImg: string
  createdAt: string
  author: {
    name: string
    avatar: string
  }
}

const truncateText = (text: string, maxLength = 120): string =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text

const backendBaseURL = "http://localhost:5000"

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [form, setForm] = useState({ title: "", synopsis: "", content: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${backendBaseURL}/api/blogs`)
      setBlogs(res.data)
      setError(null)
    } catch (err) {
      setError("Failed to load blogs")
      toast.error("Failed to load blogs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleReadMore = async (blogId: number) => {
    try {
      const res = await axios.get(`${backendBaseURL}/api/blogs/${blogId}`)
      setSelectedBlog(res.data)
    } catch (err) {
      toast.error("❌ Failed to load full blog")
    }
  }

  const handleCreateBlog = async () => {
    if (!form.title || !form.synopsis || !form.content) {
      toast.warning("Please fill in all blog fields")
      return
    }

    try {
      setLoading(true)
      let featuredImg = ""

      if (imageFile) {
        const formData = new FormData()
        formData.append("file", imageFile)
        const res = await axios.post(`${backendBaseURL}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        featuredImg = res.data.url
      }

      const blogData = {
        ...form,
        ...(featuredImg && { featuredImg }),
      }

      await axios.post(`${backendBaseURL}/api/blogs`, blogData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success("Blog posted successfully")
      setForm({ title: "", synopsis: "", content: "" })
      setImageFile(null)
      setImagePreview(null)
      fetchBlogs()
      setTabValue(0) // Switch to blogs tab after posting
    } catch (err: any) {
      console.error(err.response?.data || err.message)
      toast.error("Error saving blog")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <CssBaseline />
      <ToastContainer position="bottom-right" />

      {/* App Bar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                fontFamily: '"Poppins", sans-serif',
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                flexGrow: 1,
              }}
            >
              BlogIt
            </Typography>

            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              onClick={() => navigate("/profile")}
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Profile
            </Button>

            <IconButton
              onClick={handleLogout}
              sx={{
                color: "text.primary",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
          >
            <Tab
              label="Browse Blogs"
              icon={<ArticleIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                py: 2,
              }}
            />
            <Tab
              label="Create New Blog"
              icon={<AddIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                py: 2,
              }}
            />
          </Tabs>
        </Paper>

        {/* Create Blog Form */}
        {tabValue === 1 && (
          <Fade in={tabValue === 1} timeout={500}>
            <Paper
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 3,
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h5"
                mb={3}
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <EditIcon color="primary" /> Create New Blog
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <TextField
                  name="title"
                  label="Blog Title"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  name="synopsis"
                  label="Synopsis"
                  value={form.synopsis}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  name="content"
                  label="Content (Markdown)"
                  value={form.content}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5, mr: 1 }}>
                        <ArticleIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<ImageIcon />}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      px: 3,
                      borderColor: "divider",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  >
                    Upload Featured Image
                    <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                  </Button>

                  {imagePreview && (
                    <Box mt={2} position="relative">
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                        onClick={() => {
                          setImageFile(null)
                          setImagePreview(null)
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Preview"
                        sx={{
                          width: "100%",
                          maxHeight: 300,
                          objectFit: "cover",
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                <Button
                  variant="contained"
                  onClick={handleCreateBlog}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(0, 0, 0, 0.12)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Publishing...
                    </>
                  ) : (
                    "Publish Blog"
                  )}
                </Button>
              </Stack>
            </Paper>
          </Fade>
        )}

        {/* Blog List */}
        {tabValue === 0 && (
          <Fade in={tabValue === 0} timeout={500}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ArticleIcon fontSize="large" color="primary" /> Latest Blogs
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setTabValue(1)}
                  sx={{
                    py: 1.2,
                    px: 3,
                    fontWeight: 600,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Create New
                </Button>
              </Box>

              {loading && blogs.length === 0 ? (
                <Box display="flex" justifyContent="center" my={8}>
                  <CircularProgress size={60} />
                </Box>
              ) : error ? (
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 0, 0, 0.05)",
                    border: "1px solid rgba(255, 0, 0, 0.1)",
                  }}
                >
                  <Typography color="error">{error}</Typography>
                </Paper>
              ) : blogs.length === 0 ? (
                <Paper
                  sx={{
                    p: 6,
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No blogs found
                  </Typography>
                  <Typography color="text.secondary" mb={3}>
                    Be the first to create a blog post!
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setTabValue(1)}
                    sx={{
                      py: 1.2,
                      px: 3,
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Create Blog
                  </Button>
                </Paper>
              ) : (
                <Grid container spacing={3}>
                  {blogs.map((blog) => (
                    <Grid size={{xs:12, sm:6, md:4}} key={blog.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 3,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                          },
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={`${backendBaseURL}${blog.featuredImg}`}
                          alt={blog.title}
                          sx={{
                            objectFit: "cover",
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              fontSize: "1.25rem",
                              mb: 1,
                              lineHeight: 1.4,
                            }}
                          >
                            {blog.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              lineHeight: 1.6,
                            }}
                          >
                            {truncateText(blog.synopsis, 100)}
                          </Typography>

                          <Divider sx={{ my: 2 }} />

                          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 36,
                                height: 36,
                              }}
                            >
                              {blog.author.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {blog.author.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </Typography>
                            </Box>
                          </Stack>

                          <Button
                            onClick={() => handleReadMore(blog.id)}
                            variant="outlined"
                            fullWidth
                            sx={{
                              mt: 1,
                              borderRadius: 2,
                              py: 1,
                              borderColor: "divider",
                              color: "primary.main",
                              fontWeight: 600,
                              "&:hover": {
                                borderColor: "primary.main",
                                backgroundColor: "rgba(0, 0, 0, 0.02)",
                              },
                            }}
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Fade>
        )}
      </Container>

      {/* Blog Modal */}
      <Modal
        open={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        aria-labelledby="blog-modal-title"
        closeAfterTransition
      >
        <Fade in={!!selectedBlog}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: { xs: 2, sm: 4 },
              width: "90%",
              maxWidth: 900,
              maxHeight: "90vh",
              overflowY: "auto",
              outline: "none",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {selectedBlog && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    id="blog-modal-title"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    {selectedBlog.title}
                  </Typography>
                  <IconButton
                    onClick={() => setSelectedBlog(null)}
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main" }}>{selectedBlog.author.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {selectedBlog.author.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(selectedBlog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  component="img"
                  src={`${backendBaseURL}${selectedBlog.featuredImg}`}
                  alt={selectedBlog.title}
                  sx={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 3,
                  }}
                />

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontStyle: "italic",
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedBlog.synopsis}
                  </Typography>
                </Paper>

                <Box
                  sx={{
                    "& p": {
                      lineHeight: 1.8,
                      mb: 2,
                    },
                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                      fontWeight: 700,
                      mt: 3,
                      mb: 2,
                      color: "text.primary",
                    },
                    "& a": {
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    },
                    "& img": {
                      maxWidth: "100%",
                      borderRadius: 1,
                      my: 2,
                    },
                    "& blockquote": {
                      borderLeft: "4px solid",
                      borderColor: "primary.main",
                      pl: 2,
                      py: 1,
                      my: 2,
                      fontStyle: "italic",
                      bgcolor: "rgba(0, 0, 0, 0.02)",
                    },
                    "& code": {
                      fontFamily: "monospace",
                      bgcolor: "rgba(0, 0, 0, 0.05)",
                      p: 0.5,
                      borderRadius: 0.5,
                    },
                    "& pre": {
                      bgcolor: "rgba(0, 0, 0, 0.05)",
                      p: 2,
                      borderRadius: 1,
                      overflowX: "auto",
                    },
                  }}
                >
                  <ReactMarkdown>{selectedBlog.content}</ReactMarkdown>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default BlogsPage

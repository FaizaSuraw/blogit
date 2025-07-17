import type React from "react"
import { useEffect, useState } from "react"
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
  Paper,
  Divider,
  InputAdornment,
  CircularProgress,
  Grid,
  Fade,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ReactMarkdown from "react-markdown"

const backendBaseURL = "https://blogit-1xz6.onrender.com"

const EditBlogPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    content: "",
    featuredImg: "",
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewTab, setPreviewTab] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${backendBaseURL}/api/blogs/${id}`)
        const { title, synopsis, content, featuredImg } = res.data
        setForm({ title, synopsis, content, featuredImg })
        setPreview(`${backendBaseURL}${featuredImg}`)
      } catch (err) {
        toast.error("Error fetching blog")
        navigate("/profile")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpdate = async () => {
    if (!form.title || !form.synopsis || !form.content) {
      toast.warning("Please fill in all required fields")
      return
    }

    try {
      setSaving(true)
      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("synopsis", form.synopsis)
      formData.append("content", form.content)

      if (imageFile) {
        formData.append("featuredImg", imageFile)
      }

      await axios.patch(`${backendBaseURL}/api/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Blog updated successfully")
      setTimeout(() => {
        navigate("/profile")
      }, 1500)
    } catch (err) {
      toast.error("Error updating blog")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <ToastContainer position="bottom-right" />
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/profile")}
              sx={{
                color: "text.primary",
                mr: 2,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
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
              Edit Blog
            </Typography>

            <Button
              variant="outlined"
              startIcon={previewTab ? <ArticleIcon /> : <ImageIcon />}
              onClick={() => setPreviewTab(!previewTab)}
              sx={{
                mr: 2,
                borderColor: "divider",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                },
              }}
            >
              {previewTab ? "Edit Mode" : "Preview"}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:8}}>
            {previewTab ? (
              <Fade in={previewTab} timeout={300}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 3,
                    }}
                  >
                    {form.title || "Blog Title"}
                  </Typography>

                  {preview && (
                    <Box
                      component="img"
                      src={preview}
                      alt="Featured"
                      sx={{
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 3,
                      }}
                    />
                  )}

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
                      {form.synopsis || "Blog synopsis will appear here..."}
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
                    <ReactMarkdown>{form.content || "Blog content will appear here..."}</ReactMarkdown>
                  </Box>
                </Paper>
              </Fade>
            ) : (
              <Fade in={!previewTab} timeout={300}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 4,
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
                    <ArticleIcon color="primary" /> Edit Blog Content
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
                      slotProps={{
                       input:{
                         startAdornment: (
                          <InputAdornment position="start">
                            <TitleIcon sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                       }
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
                      slotProps={{
                        input:{
                          startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                        }
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
                      rows={12}
                      variant="outlined"
                      slotProps={{
                        input:{
                          startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5, mr: 1 }}>
                            <ArticleIcon sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                      }}
                        }
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
                        Change Featured Image
                        <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                      </Button>
                    </Box>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<CancelIcon />}
                        onClick={() => navigate("/profile")}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          px: 3,
                          borderColor: "divider",
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: "error.main",
                            color: "error.main",
                          },
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleUpdate}
                        disabled={saving}
                        sx={{
                          py: 1.5,
                          px: 4,
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
                        {saving ? (
                          <>
                            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                border: "1px solid",
                borderColor: "divider",
                position: "sticky",
                top: 100,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                Featured Image
              </Typography>

              {preview ? (
                <Box position="relative">
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
                      setPreview(null)
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <Box
                    component="img"
                    src={preview}
                    alt="Featured"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    borderRadius: 2,
                    mb: 3,
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography color="text.secondary">No image selected</Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                Markdown Tips
              </Typography>

              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  "& code": {
                    fontFamily: "monospace",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    p: 0.5,
                    borderRadius: 0.5,
                  },
                }}
              >
                <Typography variant="body2" gutterBottom>
                  <code># Heading 1</code>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <code>## Heading 2</code>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <code>**Bold Text**</code>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <code>*Italic Text*</code>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <code>[Link](https://example.com)</code>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <code>![Image Alt](image-url.jpg)</code>
                </Typography>
                <Typography variant="body2">
                  <code>- List item</code>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default EditBlogPage

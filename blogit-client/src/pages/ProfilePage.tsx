import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
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
  Box,
  Avatar,
  Grid,
  Divider,
  Tabs,
  Tab,
  InputAdornment,
  CircularProgress,
  Fade,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Article as ArticleIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const backendBaseURL = "https://blogit-1xz6.onrender.com/"

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  })
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null)

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${backendBaseURL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProfile(res.data)
      setForm({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        email: res.data.email,
      })
    } catch (err) {
      toast.error("Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true)
      await axios.patch(`${backendBaseURL}/api/profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Profile updated successfully")
      fetchProfile()
    } catch (err) {
      toast.error("Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.warning("Please fill in all password fields")
      return
    }

    try {
      setChangingPassword(true)
      await axios.patch(`${backendBaseURL}/api/profile/update-password`, passwordForm, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Password updated successfully")
      setPasswordForm({ currentPassword: "", newPassword: "" })
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password")
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return

    try {
      await axios.delete(`${backendBaseURL}/api/blogs/${blogToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Blog deleted successfully")
      fetchProfile()
      setDeleteDialogOpen(false)
      setBlogToDelete(null)
    } catch (err) {
      toast.error("Failed to delete blog")
    }
  }

  const openDeleteDialog = (blogId: number) => {
    setBlogToDelete(blogId)
    setDeleteDialogOpen(true)
  }

  const handleEditBlog = (blogId: number) => {
    navigate(`/edit-blog/${blogId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
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
              startIcon={<ArticleIcon />}
              onClick={() => navigate("/blogs")}
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Blogs
            </Button>

            <Button
              color="inherit"
              startIcon={<AddIcon />}
              onClick={() => navigate("/blogs")}
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Create Blog
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
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            border: "1px solid",
            borderColor: "divider",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{xs:12, sm:"auto"}}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                }}
              >
                {profile?.firstName?.charAt(0)}
              </Avatar>
            </Grid>
            <Grid size={{xs:12,sm:"auto"}}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                @{profile?.username}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={`${profile?.blogs?.length || 0} Blogs`}
                  icon={<ArticleIcon />}
                  sx={{
                    mr: 1,
                    fontWeight: 500,
                    backgroundColor: "rgba(102, 126, 234, 0.1)",
                    color: "primary.main",
                  }}
                />
                <Chip
                  label="Author"
                  icon={<PersonIcon />}
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "rgba(118, 75, 162, 0.1)",
                    color: "#764ba2",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
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
              label="My Blogs"
              icon={<ArticleIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                py: 2,
              }}
            />
            <Tab
              label="Account Settings"
              icon={<PersonIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                py: 2,
              }}
            />
          </Tabs>
        </Paper>
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
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ArticleIcon color="primary" /> My Blogs
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/blogs")}
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
                  Create New Blog
                </Button>
              </Box>

              {profile?.blogs?.length === 0 ? (
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
                    You haven't created any blogs yet
                  </Typography>
                  <Typography color="text.secondary" mb={3}>
                    Share your thoughts and ideas with the world!
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/blogs")}
                    sx={{
                      py: 1.2,
                      px: 3,
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Create Your First Blog
                  </Button>
                </Paper>
              ) : (
                <Grid container spacing={3}>
                  {profile?.blogs?.map((blog: any) => (
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
                          height="160"
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
                            {blog.synopsis.length > 80 ? `${blog.synopsis.substring(0, 80)}...` : blog.synopsis}
                          </Typography>

                          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </Typography>

                          <Stack direction="row" spacing={1}>
                            <Button
                              onClick={() => handleEditBlog(blog.id)}
                              size="small"
                              variant="outlined"
                              startIcon={<EditIcon />}
                              sx={{
                                borderRadius: 2,
                                borderColor: "divider",
                                color: "primary.main",
                                "&:hover": {
                                  borderColor: "primary.main",
                                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                                },
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => openDeleteDialog(blog.id)}
                              size="small"
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              sx={{
                                borderRadius: 2,
                                borderColor: "divider",
                                color: "error.main",
                                "&:hover": {
                                  borderColor: "error.main",
                                  backgroundColor: "rgba(244, 67, 54, 0.04)",
                                },
                              }}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Fade>
        )}
        {tabValue === 1 && (
          <Fade in={tabValue === 1} timeout={500}>
            <Grid container spacing={4}>
              <Grid size={{xs:12, md:6}}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
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
                    <PersonIcon color="primary" /> Profile Information
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid size={{xs:12, sm:6}}>
                        <TextField
                          name="firstName"
                          label="First Name"
                          value={form.firstName}
                          onChange={handleProfileChange}
                          fullWidth
                          slotProps={{
                            input:{
                              startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon sx={{ color: "text.secondary" }} />
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
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <TextField
                          name="lastName"
                          label="Last Name"
                          value={form.lastName}
                          onChange={handleProfileChange}
                          fullWidth
                          slotProps={{
                           input: {
                             startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon sx={{ color: "text.secondary" }} />
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
                      </Grid>
                    </Grid>

                    <TextField
                      name="username"
                      label="Username"
                      value={form.username}
                      onChange={handleProfileChange}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "text.secondary" }} />
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
                      name="email"
                      label="Email"
                      value={form.email}
                      onChange={handleProfileChange}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "text.secondary" }} />
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

                    <Button
                      variant="contained"
                      onClick={handleUpdateProfile}
                      disabled={updating}
                      sx={{
                        py: 1.5,
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
                      {updating ? (
                        <>
                          <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Updating...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
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
                    <LockIcon color="primary" /> Security
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Stack spacing={3}>
                    <TextField
                      name="currentPassword"
                      label="Current Password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      slotProps={{
                       input: {
                         startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
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
                      name="newPassword"
                      label="New Password"
                      type={showPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      slotProps={{
                     input: {
                         startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
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

                    <Button
                      variant="contained"
                      onClick={handleUpdatePassword}
                      disabled={changingPassword}
                      sx={{
                        py: 1.5,
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
                      {changingPassword ? (
                        <>
                          <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Updating...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Container>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            sx: {
            borderRadius: 3,
            p: 1,
          },
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteBlog}
            variant="contained"
            color="error"
            autoFocus
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProfilePage

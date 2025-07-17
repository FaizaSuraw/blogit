import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
  Paper,
  CircularProgress,
  Grid,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material"
import { Person, Email, Lock, Visibility, VisibilityOff, AccountCircle, ArrowBack } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/\d/, "Must contain a number")
    .regex(/[@$!%*?&.,#^]/, "Must contain a special character"),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage("")
      setSuccess(false)
      setLoading(true)
      const res = await axios.post("http://localhost:5000/api/auth/register", data)
      console.log("Registration successful:", res.data)
      localStorage.setItem("token", res.data.token)
      setSuccess(true)
      setTimeout(() => {
        navigate("/blogs")
        setLoading(false)
      }, 2000)
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.response?.data?.message || "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          px: { xs: 2, sm: 4 },
          py: 3,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#fff",
            fontFamily: '"Poppins", sans-serif',
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          BlogIt
        </Typography>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          sx={{
            color: "#fff",
            fontWeight: 600,
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            "&:hover": {
              color: "#fbbf24",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  mb: 2,
                }}
              >
                <AccountCircle sx={{ fontSize: 40, color: "#fff" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 1,
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: "1.1rem",
                }}
              >
                Start your blogging journey with us
              </Typography>
            </Box>

            {errorMessage && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiAlert-message": { fontSize: "1rem" },
                }}
              >
                {errorMessage}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiAlert-message": { fontSize: "1rem" },
                }}
              >
                Registration successful! Redirecting...
              </Alert>
            )}

            {loading && (
              <Box display="flex" justifyContent="center" my={3}>
                <CircularProgress size={32} />
              </Box>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    label="First Name"
                    fullWidth
                    disabled={loading}
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      }
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    disabled={loading}
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    slotProps={{
                     input: {
                       startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                     }
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Username"
                fullWidth
                disabled={loading}
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  }
                }}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                disabled={loading}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                disabled={loading}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" disabled={loading}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 2,
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
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Box>

            {/* Footer */}
            <Box textAlign="center" mt={4}>
              <Typography variant="body1" color="text.secondary">
                Already have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/login"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign In
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  )
}

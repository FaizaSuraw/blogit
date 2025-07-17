import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  CircularProgress,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Fade,
  Divider,
} from "@mui/material"
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  ArrowBack,
  Google,
  GitHub,
} from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const schema = z.object({
  emailOrUsername: z.string().min(3, "Enter a valid email or username"),
  password: z.string().min(1, "Password is required"),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setErrorMessage("")
      const res = await axios.post("https://blogit-1xz6.onrender.com/api/auth/login", data)
      const { token } = res.data
      localStorage.setItem("token", token)
      navigate("/blogs")
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.response?.data?.message || "Login failed")
    } finally {
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
              maxWidth: 450,
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
                <LoginIcon sx={{ fontSize: 40, color: "#fff" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: "1.1rem",
                }}
              >
                Sign in to continue your blogging journey
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Google />}
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHub />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                Continue with GitHub
              </Button>
            </Box>

            <Divider sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                or continue with email
              </Typography>
            </Divider>
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

            {loading && (
              <Box display="flex" justifyContent="center" my={3}>
                <CircularProgress size={32} />
              </Box>
            )}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Email or Username"
                fullWidth
                disabled={loading}
                {...register("emailOrUsername")}
                error={!!errors.emailOrUsername}
                helperText={errors.emailOrUsername?.message}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
                slotProps={{
                 input: {
                   startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                 }
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
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
                slotProps={{
                 input:{
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
                 }
                }}
              />

              <Box textAlign="right" mb={3}>
                <MuiLink
                  href="/forgot-password"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
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
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Box>
            <Box textAlign="center" mt={4}>
              <Typography variant="body1" color="text.secondary">
                Don't have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/register"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Create Account
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  )
}

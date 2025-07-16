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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  emailOrUsername: z.string().min(3, "Enter a valid email or username"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
      );
      const { token } = res.data;

      localStorage.setItem("token", token);

      navigate("/blogs");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #673ab7, #512da8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={2}
            fontFamily={"cursive"}
          >
            Log in to continue writing or reading blogs
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          {loading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={28} color="primary" />
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email or Username"
              fullWidth
              size="small"
              margin="dense"
              disabled={loading}
              {...register("emailOrUsername")}
              error={!!errors.emailOrUsername}
              helperText={errors.emailOrUsername?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
              margin="dense"
              disabled={loading}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, py: 1 }}
            >
              Login
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              underline="hover"
              color="primary"
            >
              Register
            </MuiLink>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

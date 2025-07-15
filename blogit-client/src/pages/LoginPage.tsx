import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Zod schema
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/blogs"; // 👈 Fallback to /blogs

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
      );
      localStorage.setItem("token", res.data.token);
      navigate(from, { replace: true }); // 👈 Redirect back after login
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Email or Username"
              {...register("emailOrUsername")}
              error={!!errors.emailOrUsername}
              helperText={errors.emailOrUsername?.message}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>

            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Button variant="text" onClick={() => navigate("/register")}>
                Register
              </Button>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

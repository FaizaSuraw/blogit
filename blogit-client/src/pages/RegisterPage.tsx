import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Paper,
  Link,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterPage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user.displayName, user.email);

      // redirect to blogs after successful sign-in
      window.location.href = "/blogs";
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Section */}
      <Container
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 900,
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: 4,
            borderRadius: 4,
            bgcolor: "#fafafa",
          }}
        >
          {/* Left - Google Logo */}
          <Box
            sx={{
              width: isSmall ? "100%" : "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              sx={{ width: 120, height: 120 }}
            />
          </Box>

          {/* Right - Content */}
          <Box
            sx={{
              width: isSmall ? "100%" : "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: isSmall ? "center" : "left",
            }}
          >
            <Typography variant="h4" fontWeight={700} mb={1}>
              Sign up to BlogIt
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Use your Google account to create and manage your blogs.
            </Typography>

            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                backgroundColor: "#4285F4",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#357ae8",
                },
              }}
            >
              Sign Up with Google
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "transparent", py: 3, px: 2, mt: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          {/* Language Selector (Left) */}
          <Select
            defaultValue="en"
            variant="standard"
            disableUnderline
            sx={{
              minWidth: 100,
              color: "#333",
              "& .MuiSelect-icon": {
                color: "#333",
              },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="sw">Swahili</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>

          {/* Footer Links (Right) */}
          <Stack direction="row" spacing={2}>
            <Link href="#" underline="hover" color="text.primary" fontSize={16}>
              Help
            </Link>
            <Link href="#" underline="hover" color="text.primary" fontSize={16}>
              Privacy
            </Link>
            <Link href="#" underline="hover" color="text.primary" fontSize={16}>
              Terms
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

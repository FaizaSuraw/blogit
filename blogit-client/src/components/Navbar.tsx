import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showNavbar) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "background.default",
        color: "text.primary",
        zIndex: 999,
        px: { xs: 2, sm: 6 },
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontFamily: `'Roboto Slab', serif`,
        }}
      >
        BlogIt
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        {!isSmallScreen && (
          <>
            <Button
              variant="outlined"
              href="/login"
              sx={{
                color: "text.primary",
                borderColor: "#e69500",
                fontWeight: 600,
                "&:hover": {
                  color: "#e69500",
                  borderColor: "#e69500",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              href="/register"
              sx={{
                backgroundColor: "#e69500",
                color: "#000",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#ffb700",
                },
              }}
            >
              Create your blog
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

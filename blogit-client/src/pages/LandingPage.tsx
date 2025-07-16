import {
  Box,
  Typography,
  Button,
  Stack,
  Fade,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

const themes = [
  {
    color: "#388d80",
    images: {
      left: ["/assets/vase.png", "/assets/ball.png", "/assets/calc.png"],
      center: "/assets/blog1.png",
      right: ["/assets/tea.png", "/assets/shoe.png", "/assets/money.png"],
    },
  },
  {
    color: "#934c4c",
    images: {
      left: [
        "/assets/orange1.png",
        "/assets/orange2.png",
        "/assets/orange3.png",
      ],
      center: "/assets/blog2.png",
      right: [
        "/assets/orange4.png",
        "/assets/orange5.png",
        "/assets/orange6.png",
      ],
    },
  },
  {
    color: "#4583AA",
    images: {
      left: ["/assets/blue1.png", "/assets/blue2.png", "/assets/blue3.png"],
      center: "/assets/blog3.png",
      right: ["/assets/blue4.png", "/assets/blue5.png", "/assets/blue6.png"],
    },
  },
];

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % themes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentTheme = themes[themeIndex];

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          px: { xs: 2, sm: 6 },
          py: 2,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: 30,
            fontFamily: `'Roboto Slab', serif`,
            textShadow: "0 0 2px rgba(0,0,0,0.3)",
          }}
        >
          BlogIt
        </Typography>

        <Button
          variant="text"
          href="/login"
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 18,
            textShadow: "0 0 2px rgba(0,0,0,0.4)",
            "&:hover": {
              color: "#ffd700",
            },
          }}
        >
          Sign In
        </Button>
      </Box>

      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: currentTheme.color,
          color: "#fff",
          overflow: "hidden",
          textAlign: "center",
          px: 3,
          pt: isSmallScreen ? 20 : 12,
          pb: isSmallScreen ? 6 : 12,
          transition: "background-color 1s ease-in-out",
        }}
      >

        <Fade in={loaded} timeout={1200}>
          <Box sx={{ zIndex: 1, maxWidth: 700 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 100,
                letterSpacing: 1,
                fontSize: { xs: "1.5rem", sm: "2.5rem", md: "2.9rem" },
                mb: 2,
              }}
            >
              Publish your passions, your way
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                letterSpacing: 1,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                mb: 4,
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Create a unique and beautiful blog easily.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e69500",
                  color: "#000",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#e6c200",
                  },
                }}
                href="/register"
              >
                Create your blog
              </Button>
            </Stack>
          </Box>
        </Fade>

        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            width: "100%",
            height: isSmallScreen ? "300px" : "500px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={themeIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 50 }}
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {currentTheme.images.left.map((src, index) => (
                <Box
                  key={`left-${index}`}
                  component="img"
                  src={src}
                  alt={`left-${index}`}
                  sx={{
                    position: "absolute",
                    bottom: `${100 + index * 120}px`,
                    left: `${30 + index * 60}px`,
                    width: isSmallScreen ? "60px" : "100px",
                    opacity: 0.85,
                    transition: "all 1s ease-in-out",
                  }}
                />
              ))}

              {currentTheme.images.right.map((src, index) => (
                <Box
                  key={`right-${index}`}
                  component="img"
                  src={src}
                  alt={`right-${index}`}
                  sx={{
                    position: "absolute",
                    bottom: `${100 + index * 120}px`,
                    right: `${50 + index * 90}px`,
                    width: isSmallScreen ? "60px" : "100px",
                    opacity: 0.85,
                    transition: "all 1s ease-in-out",
                  }}
                />
              ))}

              {!isSmallScreen && (
                <Paper
                  elevation={6}
                  sx={{
                    position: "absolute",
                    bottom: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "white",
                    p: 2,
                    borderRadius: 20,
                    height: "340px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 1s ease-in-out",
                  }}
                >
                  <Box
                    component="img"
                    src={currentTheme.images.center}
                    alt="center-theme-img"
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Paper>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      <About />
      <Footer />
    </>
  );
}

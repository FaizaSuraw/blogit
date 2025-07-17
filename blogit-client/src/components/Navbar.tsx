import { Box, Button, Typography, useMediaQuery, useTheme, Slide, AppBar, Toolbar, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Edit, Login } from "@mui/icons-material"

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Slide direction="down" in={showNavbar} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                fontFamily: '"Poppins", sans-serif',
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BlogIt
            </Typography>

            {!isSmallScreen && (
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<Login />}
                  href="/login"
                  sx={{
                    color: "text.primary",
                    borderColor: "divider",
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "primary.50",
                    },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  href="/register"
                  sx={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                    color: "#000",
                    boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                      boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
                    },
                  }}
                >
                  Start Writing
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  )
}

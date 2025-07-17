import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  Card,
  CardContent,
  Fade,
  Grow,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Edit, TrendingUp, People, Palette, ArrowForward, Star } from "@mui/icons-material"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const features = [
  {
    icon: <Edit />,
    title: "Beautiful Editor",
    description: "Write with our intuitive, distraction-free editor designed for creativity.",
  },
  {
    icon: <Palette />,
    title: "Custom Themes",
    description: "Choose from stunning themes or create your own unique design.",
  },
  {
    icon: <TrendingUp />,
    title: "Analytics",
    description: "Track your audience and understand what content resonates most.",
  },
  {
    icon: <People />,
    title: "Community",
    description: "Connect with fellow writers and build your audience organically.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Blogger",
    content:
      "BlogIt transformed how I share my adventures. The platform is intuitive and my audience loves the clean design.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Tech Writer",
    content:
      "The best blogging platform I've used. Great features, excellent performance, and amazing community support.",
    rating: 5,
  },
]

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
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
          variant="text"
          href="/login"
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.1rem",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            "&:hover": {
              color: "#fbbf24",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
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

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size= {{xs:12, md:6}}>
              <Fade in={loaded} timeout={1000}>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                      mb: 3,
                      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      lineHeight: 1.2,
                    }}
                  >
                    Share Your Story
                    <Box component="span" sx={{ color: "#fbbf24" }}>
                      {" "}
                      Beautifully
                    </Box>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: 400,
                      mb: 4,
                      fontSize: { xs: "1.2rem", sm: "1.4rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    Create stunning blogs with our powerful yet simple platform. Join thousands of writers who trust
                    BlogIt to share their passions.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      href="/register"
                      sx={{
                        background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                        color: "#000",
                        fontWeight: 600,
                        py: 2,
                        px: 4,
                        fontSize: "1.1rem",
                        boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 35px rgba(245, 158, 11, 0.5)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Start Writing Today
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      href="#features"
                      sx={{
                        color: "#fff",
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        fontWeight: 600,
                        py: 2,
                        px: 4,
                        fontSize: "1.1rem",
                        "&:hover": {
                          borderColor: "#fff",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid size= {{xs:12, md:6}}>
              <Grow in={loaded} timeout={1500}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 700,
                      height: 500,
                      background: "url('hero-image.webp') center center no-repeat",
                      backgroundSize: "contain",
                      borderRadius: 6,
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                  </Box>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box id="features" sx={{ py: 12, backgroundColor: "background.paper" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
              }}
            >
              Everything You Need to Blog
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Powerful features designed to help you create, customize, and grow your blog
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{xs:12, sm:6, md:3}} key={index}>
                <Grow in={loaded} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: "primary.main",
                          mb: 2,
                          "& svg": { fontSize: 48 },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" mb={2}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">{feature.description}</Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 12, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
              }}
            >
              Loved by Writers Worldwide
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{xs:12, md:6}} key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: "#fbbf24", fontSize: 20 }} />
                      ))}
                    </Stack>
                    <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          color: "#fff",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Start Your Journey?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Join thousands of writers who have already discovered the joy of blogging with BlogIt
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            href="/register"
            sx={{
              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
              color: "#000",
              fontWeight: 600,
              py: 2,
              px: 6,
              fontSize: "1.2rem",
              boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(245, 158, 11, 0.5)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Create Your Blog Now
          </Button>
        </Container>
      </Box>

      <Footer />
    </>
  )
}

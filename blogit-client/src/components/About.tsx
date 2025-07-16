import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#f57c00",
        color: "#fff",
        height: "100vh",
        px: { xs: 3, sm: 6, md: 12 },
        py: { xs: 6, md: 8 },
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontFamily: `'Roboto Slab', serif`,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mb: 3,
          }}
        >
          Choose the perfect design
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" },
            lineHeight: 1.8,
            maxWidth: 500,
            mx: { xs: "auto", md: 0 },
          }}
        >
          Create a beautiful blog that fits your style. Choose from a selection
          of easy-to-use templates – all with flexible layouts and hundreds of
          background images – or design something new.
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: "45%" },
          height: "100%",
          mt: { xs: 4, md: 0 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/pen.png"
          alt="Top Image"
          sx={{
            position: "absolute",
            top: 0,
            right: { xs: 80, md: 200 },
            width: { xs: 200, sm: 300, md: 400 },
            opacity: 0.95,
          }}
        />
        <Box
          component="img"
          src="/assets/about.png"
          alt="Right Image"
          sx={{
            position: "absolute",
            bottom: -100,
            right: { xs: -150, md: -200 },
            height: { xs: 310, sm: 280, md: 500 },
            objectFit: "contain",
            opacity: 0.9,
          }}
        />
      </Box>
    </Box>
  );
}

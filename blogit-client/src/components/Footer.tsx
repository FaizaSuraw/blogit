import { Box, Typography, Link, Divider, Stack, Container, Grid, IconButton} from "@mui/material"
import { Facebook, GitHub, Twitter, Instagram, Help, Group, Code, Language } from "@mui/icons-material"

export default function Footer() {
  const footerSections = [
    {
      title: "Help",
      icon: <Help />,
      links: [
        { text: "Help Center", href: "/help" },
        { text: "Support", href: "/support" },
        { text: "Tutorials", href: "/tutorials" },
      ],
    },
    {
      title: "Community",
      icon: <Group />,
      links: [
        { text: "BlogIt Community", href: "/community" },
        { text: "Writers Hub", href: "/writers" },
        { text: "Success Stories", href: "/stories" },
      ],
    },
    {
      title: "Developers",
      icon: <Code />,
      links: [
        { text: "API Documentation", href: "https://api.blogit.com/docs", external: true },
        { text: "GitHub Repository", href: "https://github.com/FaizaSuraw/blog-api", external: true },
        { text: "Developer Tools", href: "/dev-tools" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook />, href: "https://facebook.com/blogit", label: "Facebook" },
    { icon: <Twitter />, href: "https://twitter.com/blogit", label: "Twitter" },
    { icon: <GitHub />, href: "https://github.com/FaizaSuraw/blog-api", label: "GitHub" },
    { icon: <Instagram />, href: "https://instagram.com/blogit", label: "Instagram" },
  ]

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#fff",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {footerSections.map((section, index) => (
            <Grid size={{xs:12, sm:6, md:3}} key={index}>
              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ color: "secondary.main" }}>{section.icon}</Box>
                  <Typography variant="h6" fontWeight="bold">
                    {section.title}
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: "secondary.main",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          ))}

          <Grid size= {{xs:12, sm:6, md:3}}>
            <Stack spacing={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Language sx={{ color: "secondary.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  Connect With Us
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "secondary.main",
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Join thousands of writers sharing their stories on BlogIt
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            {["Terms of Service", "Privacy Policy", "Content Policy", "Cookie Policy"].map((text, index) => (
              <Link
                key={index}
                href={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.9rem",
            }}
          >
            © {new Date().getFullYear()} BlogIt. Made with ❤️ for writers everywhere.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

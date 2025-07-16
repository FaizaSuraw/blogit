import {
  Box,
  Typography,
  Link,
  Divider,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      sx={{ bgcolor: "#1D2B34", color: "#fff", py: 6, px: { xs: 3, md: 10 } }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Help
          </Typography>
          <Link href="/help" underline="hover" color="inherit">
            Help Center
          </Link>
          <Link href="/support" underline="hover" color="inherit">
            Support
          </Link>
          <Link href="/tutorials" underline="hover" color="inherit">
            Tutorials
          </Link>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Community
          </Typography>
          <Link href="/community" underline="hover" color="inherit">
            BlogIt Community
          </Link>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Developers
          </Typography>
          <Link
            href="https://api.blogit.com/docs"
            underline="hover"
            color="inherit"
            target="_blank"
            rel="noopener"
          >
            BlogIt API Docs
          </Link>
          <Link
            href="https://github.com/FaizaSuraw/blog-api"
            underline="hover"
            color="inherit"
            target="_blank"
            rel="noopener"
          >
            GitHub Repo
          </Link>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Follow Us
          </Typography>
          <Stack direction="row" spacing={1}>
            <Link
              href="https://facebook.com/blogit"
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://twitter.com/blogit"
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <TwitterIcon />
            </Link>
            <Link
              href="https://github.com/FaizaSuraw/blog-api"
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://instagram.com/blogit"
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <InstagramIcon />
            </Link>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        flexWrap="wrap"
      >
        <Stack direction="row" spacing={3}>
          <Link href="/terms" underline="hover" color="inherit">
            Terms of Service
          </Link>
          <Link href="/privacy" underline="hover" color="inherit">
            Privacy
          </Link>
          <Link href="/content-policy" underline="hover" color="inherit">
            Content Policy
          </Link>
        </Stack>
        <Select
          defaultValue="en"
          variant="standard"
          disableUnderline
          sx={{
            minWidth: 150,
            color: "#fff",
            fontWeight: 500,
            "& .MuiSelect-icon": {
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
            "& .MuiInputBase-input": {
              paddingLeft: 1,
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="sw">Swahili</MenuItem>
          <MenuItem value="ar">Arabic</MenuItem>
        </Select>
      </Stack>
    </Box>
  );
}

import { Box, Link, Typography } from "@mui/material";

interface ArtistCardProps {
  coverSrc: string;
  coverAlt: string;
  title: string;
}

export default function ArtistCard({ coverSrc, coverAlt, title }: ArtistCardProps) {
  return (
    <Box
      sx={{
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: "#1e2133",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Box
        component="img"
        src={coverSrc}
        alt={coverAlt}
        sx={{
          maxWidth: { xs: "80px", md: "100px" },
          display: "block",
        }}
      />
      <Typography
        sx={{
          color: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { xs: "0.8rem", md: "0.9em" },
          textAlign: "center",
          width: "100%",
        }}
      >
        {title}
      </Typography>
      <Link
        href="#"
        sx={{
          color: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { xs: "0.8rem", md: "0.9em" },
          textAlign: "center",
          width: "100%",
        }}
      >
        ...more
      </Link>
    </Box>
  );
}

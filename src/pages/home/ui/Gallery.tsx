import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const images = [
  { src: "/artists/greyrock.jpg", alt: "greyrock", slug: "greyrock" },
  { src: "/artists/madk1d.jpg", alt: "madk1d", slug: "madk1d" },
  { src: "/artists/fortuna_812_2.png", alt: "fortuna 812", slug: "fortuna-812" },
];

export default function Gallery() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        columnGap: "1rem",
        rowGap: { xs: "1rem", sm: 0 },
        alignItems: "center",
        mb: "30px",
      }}
    >
      {images.map((img) => (
        <Link
          key={img.alt}
          to={`/article/${img.slug}`}
          style={{ textDecoration: "none", display: "block" }}
        >
          <Box
            component="img"
            src={img.src}
            alt={img.alt}
            sx={{
              width: { xs: "70%", sm: "100%" },
              display: "block",
              mx: { xs: "auto", sm: 0 },
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.8 },
            }}
          />
        </Link>
      ))}
    </Box>
  );
}

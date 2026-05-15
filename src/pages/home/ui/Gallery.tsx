import { Box } from "@mui/material";

const images = [
  { src: "/artists/greyrock.jpg", alt: "greyrock" },
  { src: "/artists/madk1d.jpg", alt: "madk1d" },
  { src: "/artists/fortuna_812_2.png", alt: "fortuna 812" },
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
        <Box
          key={img.alt}
          component="img"
          src={img.src}
          alt={img.alt}
          sx={{
            width: { xs: "70%", sm: "100%" },
            display: "block",
            mx: { xs: "auto", sm: 0 },
          }}
        />
      ))}
    </Box>
  );
}

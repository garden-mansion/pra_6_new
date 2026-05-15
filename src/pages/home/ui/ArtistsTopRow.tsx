import { Box } from "@mui/material";
import ArtistCard from "./ArtistCard";

export default function ArtistsTopRow() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        gap: "20px",
        mb: { xs: "40px", sm: "10px" },
        alignItems: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "20px",
          width: { xs: "70%", sm: "40%" },
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "30%", md: "30%" } }}>
          <ArtistCard
            coverSrc="/albums_covers/kai_angel/damage.png"
            coverAlt="kai angel - damage"
            title="Kai Angel - Damage"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "70%", md: "70%" } }}>
          <ArtistCard
            coverSrc="/albums_covers/madk1d/sexyswag.png"
            coverAlt="madk1d - sexyswag"
            title="madk1d - ....swag"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "20px",
          width: { xs: "70%", sm: "40%" },
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "30%", md: "30%" } }}>
          <ArtistCard
            coverSrc="/albums_covers/FORTUNA_812/basedgod.png"
            coverAlt="FORTUNA 812 - basedgod"
            title="FORTUNA 812 - basedgod"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "70%", md: "70%" } }}>
          <ArtistCard
            coverSrc="/albums_covers/темный_принц/мрачные_треды.png"
            coverAlt="темный принц - мрачные треды"
            title="темный принц - мрачные треды"
          />
        </Box>
      </Box>
    </Box>
  );
}

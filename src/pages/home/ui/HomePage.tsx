import type { FC } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Gallery from './Gallery';
import ArtistsTopRow from './ArtistsTopRow';
import ArtistsCenterBlock from './ArtistsCenterBlock'
import Footer from './Footer'

export const HomePage: FC = () => {
  return <Box sx={{ backgroundColor: "rgb(0, 0, 0)", minHeight: "100vh" }}>
    <CssBaseline />
    <Header />

    <Box
      component="main"
      sx={{
        width: { xs: "100%", sm: "88%" },
        mx: "auto",
        mb: "100px",
      }}
    >
      <Gallery />

      <Box>
        <ArtistsTopRow />
        <ArtistsCenterBlock />
      </Box>
    </Box>

    <Footer />
  </Box>
}
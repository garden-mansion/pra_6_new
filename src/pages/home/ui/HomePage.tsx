import type { FC } from "react";
import { Box } from "@mui/material";
import Gallery from './Gallery';
import ArtistsTopRow from './ArtistsTopRow';
import ArtistsCenterBlock from './ArtistsCenterBlock'

export const HomePage: FC = () => {
  return (
    <>
      <Gallery />
      <Box>
        <ArtistsTopRow />
        <ArtistsCenterBlock />
      </Box>
    </>
  );
}
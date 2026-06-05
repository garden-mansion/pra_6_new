import type { FC } from "react";
import { Box, Typography, createTheme, ThemeProvider, GlobalStyles } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import { albums } from "../../../app/tableData";
import { columnLabels } from "../lib/columnLabels";

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const columns: GridColDef[] = [
  { field: "albumName", headerName: columnLabels.albumName, flex: 1 },
  { field: "artist", headerName: columnLabels.artist, flex: 1 },
  { field: "genre", headerName: columnLabels.genre, flex: 1 },
  { field: "country", headerName: columnLabels.country, flex: 1 },
  {
    field: "rhymesImages",
    headerName: columnLabels.rhymesImages,
    type: "number",
    flex: 1,
    valueFormatter: (value: number) => formatNumber(value),
  },
  {
    field: "structureRhythm",
    headerName: columnLabels.structureRhythm,
    type: "number",
    flex: 1,
    valueFormatter: (value: number) => formatNumber(value),
  },
  {
    field: "styleImplementation",
    headerName: columnLabels.styleImplementation,
    type: "number",
    flex: 1,
    valueFormatter: (value: number) => formatNumber(value),
  },
  {
    field: "individualityCharisma",
    headerName: columnLabels.individualityCharisma,
    type: "number",
    flex: 1,
    valueFormatter: (value: number) => formatNumber(value),
  },
  {
    field: "atmosphereVibe",
    headerName: columnLabels.atmosphereVibe,
    type: "number",
    flex: 1,
    valueFormatter: (value: number) => formatNumber(value),
  },
];

const rows = albums.map((album, idx) => ({ id: idx, ...album }));

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AlbumsPage: FC = () => {
  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Таблица альбомов
      </Typography>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            ".MuiDataGrid-panel .MuiFormControlLabel-label": {
              color: "white",
            },
            ".MuiDataGrid-panel .MuiCheckbox-root": {
              color: "white",
            },
          }}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          showToolbar
          // slotProps={{ toolbar: { showDensity: false } }}
          disableRowSelectionOnClick
          autoHeight
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            backgroundColor: "#1e1e2e",
            border: "none",
            color: "lightgray",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#121420",
              color: "white",
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#2a2a3e",
            },

          }}
        />
      </ThemeProvider>
    </Box>
  );
};

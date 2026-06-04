import { useState, useMemo } from "react";
import type { FC } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { albums } from "../../../app/tableData";
import type { TAlbum } from "../../../app/tableData";
import { columnLabels } from "../lib/columnLabels";

type ColumnKey = keyof TAlbum;

interface FilterState {
  artist: string;
  genre: string;
  country: string;
}

interface SortLevel {
  column: ColumnKey | "none";
  direction: "asc" | "desc";
}

interface SortState {
  primary: SortLevel;
  secondary: SortLevel;
}

type ColumnVisibilityState = Record<ColumnKey, boolean>;

const allColumns = Object.keys(columnLabels) as ColumnKey[];

const initialFilter: FilterState = { artist: "", genre: "", country: "" };
const initialSort: SortState = {
  primary: { column: "albumName", direction: "asc" },
  secondary: { column: "none", direction: "asc" },
};
const initialColumns: ColumnVisibilityState = Object.fromEntries(
  allColumns.map((key) => [key, true]),
) as ColumnVisibilityState;

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function compareValues(a: TAlbum, b: TAlbum, column: ColumnKey, direction: "asc" | "desc"): number {
  const aVal = a[column];
  const bVal = b[column];
  if (typeof aVal === "number" && typeof bVal === "number") {
    return direction === "asc" ? aVal - bVal : bVal - aVal;
  }
  const aStr = String(aVal).toLowerCase();
  const bStr = String(bVal).toLowerCase();
  return direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
}

export const AlbumsPage: FC = () => {
  const [pendingFilter, setPendingFilter] = useState<FilterState>(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(initialFilter);

  const [pendingSort, setPendingSort] = useState<SortState>(initialSort);
  const [appliedSort, setAppliedSort] = useState<SortState>(initialSort);

  const [pendingColumns, setPendingColumns] = useState<ColumnVisibilityState>(initialColumns);
  const [appliedColumns, setAppliedColumns] = useState<ColumnVisibilityState>(initialColumns);

  const processedData = useMemo(() => {
    let data = [...albums];

    if (appliedFilter.artist) {
      const q = appliedFilter.artist.toLowerCase();
      data = data.filter((a) => a.artist.toLowerCase().includes(q));
    }
    if (appliedFilter.genre) {
      const q = appliedFilter.genre.toLowerCase();
      data = data.filter((a) => a.genre.toLowerCase().includes(q));
    }
    if (appliedFilter.country) {
      const q = appliedFilter.country.toLowerCase();
      data = data.filter((a) => a.country.toLowerCase().includes(q));
    }

    if (appliedSort.primary.column !== "none") {
      const secondaryColumn = appliedSort.secondary.column;
      data.sort((a, b) => {
        const primaryResult = compareValues(a, b, appliedSort.primary.column as ColumnKey, appliedSort.primary.direction);
        if (primaryResult !== 0) return primaryResult;
        if (secondaryColumn === "none") return 0;
        return compareValues(a, b, secondaryColumn, appliedSort.secondary.direction);
      });
    }

    return data;
  }, [appliedFilter, appliedSort]);

  const visibleColumns = allColumns.filter((key) => appliedColumns[key]);

  const resetFilter = () => {
    setPendingFilter(initialFilter);
    setAppliedFilter(initialFilter);
  };

  const resetSort = () => {
    setPendingSort(initialSort);
    setAppliedSort(initialSort);
  };

  const resetColumns = () => {
    setPendingColumns(initialColumns);
    setAppliedColumns(initialColumns);
  };

  const setPrimaryColumn = (column: ColumnKey | "none") => {
    setPendingSort((prev) => ({
      primary: { ...prev.primary, column },
      secondary:
        column === "none" || column === prev.secondary.column
          ? { column: "none", direction: "asc" }
          : prev.secondary,
    }));
  };

  const setPrimaryDirection = (direction: "asc" | "desc") => {
    setPendingSort((prev) => ({
      ...prev,
      primary: { ...prev.primary, direction },
    }));
  };

  const setSecondaryColumn = (column: ColumnKey | "none") => {
    setPendingSort((prev) => ({
      ...prev,
      secondary: {
        column: column === prev.primary.column ? "none" : column,
        direction: prev.secondary.direction,
      },
    }));
  };

  const setSecondaryDirection = (direction: "asc" | "desc") => {
    setPendingSort((prev) => ({
      ...prev,
      secondary: { ...prev.secondary, direction },
    }));
  };

  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Таблица альбомов
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Paper sx={{ p: 2, flex: "1 1 280px", backgroundColor: "#1e1e2e" }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, color: "white" }}>
            Фильтрация
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
              size="small"
              label="Исполнитель"
              value={pendingFilter.artist}
              onChange={(e) => setPendingFilter((prev) => ({ ...prev, artist: e.target.value }))}
              sx={{ input: { color: "white" }, label: { color: "gray" } }}
            />
            <TextField
              size="small"
              label="Жанр"
              value={pendingFilter.genre}
              onChange={(e) => setPendingFilter((prev) => ({ ...prev, genre: e.target.value }))}
              sx={{ input: { color: "white" }, label: { color: "gray" } }}
            />
            <TextField
              size="small"
              label="Страна"
              value={pendingFilter.country}
              onChange={(e) => setPendingFilter((prev) => ({ ...prev, country: e.target.value }))}
              sx={{ input: { color: "white" }, label: { color: "gray" } }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setAppliedFilter(pendingFilter)}
              >
                Применить
              </Button>
              <Button variant="outlined" size="small" onClick={resetFilter}>
                Сброс
              </Button>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, flex: "1 1 280px", backgroundColor: "#1e1e2e" }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, color: "white" }}>
            Сортировка
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Уровень 1
            </Typography>
            <Select
              size="small"
              value={pendingSort.primary.column}
              onChange={(e) => setPrimaryColumn(e.target.value as ColumnKey | "none")}
              sx={{ color: "white", ".MuiOutlinedInput-notchedOutline": { borderColor: "gray" } }}
            >
              <MenuItem value="none">Нет</MenuItem>
              {allColumns.map((key) => (
                <MenuItem key={key} value={key}>
                  {columnLabels[key]}
                </MenuItem>
              ))}
            </Select>
            <Select
              size="small"
              value={pendingSort.primary.direction}
              onChange={(e) => setPrimaryDirection(e.target.value as "asc" | "desc")}
              sx={{ color: "white", ".MuiOutlinedInput-notchedOutline": { borderColor: "gray" } }}
            >
              <MenuItem value="asc">По возрастанию</MenuItem>
              <MenuItem value="desc">По убыванию</MenuItem>
            </Select>

            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              Уровень 2
            </Typography>
            <Select
              size="small"
              value={pendingSort.secondary.column}
              onChange={(e) => setSecondaryColumn(e.target.value as ColumnKey | "none")}
              disabled={pendingSort.primary.column === "none"}
              sx={{ color: "white", ".MuiOutlinedInput-notchedOutline": { borderColor: "gray" } }}
            >
              <MenuItem value="none">Нет</MenuItem>
              {allColumns.map((key) => (
                <MenuItem key={key} value={key}>
                  {columnLabels[key]}
                </MenuItem>
              ))}
            </Select>
            <Select
              size="small"
              value={pendingSort.secondary.direction}
              onChange={(e) => setSecondaryDirection(e.target.value as "asc" | "desc")}
              disabled={pendingSort.secondary.column === "none"}
              sx={{ color: "white", ".MuiOutlinedInput-notchedOutline": { borderColor: "gray" } }}
            >
              <MenuItem value="asc">По возрастанию</MenuItem>
              <MenuItem value="desc">По убыванию</MenuItem>
            </Select>
            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setAppliedSort(pendingSort)}
              >
                Применить
              </Button>
              <Button variant="outlined" size="small" onClick={resetSort}>
                Сброс
              </Button>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, flex: "1 1 280px", backgroundColor: "#1e1e2e" }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, color: "white" }}>
            Отображение столбцов
          </Typography>
          <FormGroup>
            {allColumns.map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    size="small"
                    checked={pendingColumns[key]}
                    onChange={(e) =>
                      setPendingColumns((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                    sx={{ color: "gray", "&.Mui-checked": { color: "#f27022" } }}
                  />
                }
                label={columnLabels[key]}
                sx={{ color: "white", "& .MuiTypography-root": { fontSize: "0.85em" } }}
              />
            ))}
          </FormGroup>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setAppliedColumns(pendingColumns)}
            >
              Применить
            </Button>
            <Button variant="outlined" size="small" onClick={resetColumns}>
              Сброс
            </Button>
          </Box>
        </Paper>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e2e", maxHeight: 600 }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#121420", color: "white", fontWeight: 600 }}>
                №
              </TableCell>
              {visibleColumns.map((key) => (
                <TableCell
                  key={key}
                  sx={{ backgroundColor: "#121420", color: "white", fontWeight: 600 }}
                >
                  {columnLabels[key]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + 1}
                  sx={{ color: "gray", textAlign: "center" }}
                >
                  Нет данных
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((row, idx) => (
                <TableRow key={idx} sx={{ "&:hover": { backgroundColor: "#2a2a3e" } }}>
                  <TableCell sx={{ color: "lightgray" }}>{idx + 1}</TableCell>
                  {visibleColumns.map((key) => (
                    <TableCell key={key} sx={{ color: "lightgray" }}>
                      {typeof row[key] === "number"
                        ? formatNumber(row[key] as number)
                        : String(row[key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

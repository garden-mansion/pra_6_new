import { useState, useMemo } from "react";
import type { FC } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  Divider,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { albums } from "../../../app/tableData";
import type { TAlbum } from "../../../app/tableData";
import { columnLabels } from "../../albums/lib/columnLabels";

type XKey = "albumName" | "artist" | "genre" | "country";
type YKey = Exclude<keyof TAlbum, XKey>;

const xOptions: XKey[] = ["albumName", "artist", "genre", "country"];
const yOptions: YKey[] = [
  "rhymesImages",
  "structureRhythm",
  "styleImplementation",
  "individualityCharisma",
  "atmosphereVibe",
];

const COLORS = [
  "#f27022",
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#9b59b6",
  "#f1c40f",
  "#1abc9c",
];

export const ChartPage: FC = () => {
  const [xKey, setXKey] = useState<XKey>("artist");
  const [yKeys, setYKeys] = useState<YKey[]>(["rhymesImages"]);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const dataset = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};

    albums.forEach((item) => {
      const xVal = String(item[xKey]);
      if (!map[xVal]) map[xVal] = {};
      yKeys.forEach((key) => {
        map[xVal][key] = (map[xVal][key] || 0) + Number(item[key]);
      });
    });

    return Object.entries(map).map(([group, vals]) => ({
      group,
      ...vals,
    }));
  }, [xKey, yKeys]);

  const toggleYKey = (key: YKey) => {
    setYKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const series = yKeys.map((key, idx) => ({
    dataKey: key,
    label: columnLabels[key],
    color: COLORS[idx % COLORS.length],
  }));

  const showBarLabel = chartType === "bar" && series.length === 1;

  const handleXChange = (event: SelectChangeEvent) => {
    setXKey(event.target.value as XKey);
  };

  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Диаграмма
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Группировать по</InputLabel>
          <Select
            value={xKey}
            color='white'
            label="Группировать по"
            onChange={handleXChange}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
              ".MuiSvgIcon-root": { color: "white" },
              ".MuiFormLabelRoot":  { color: "white" },
              ".MuiFormLabel-root": { color:  "white" },
            }}
          >
            {xOptions.map((key) => (
              <MenuItem key={key} value={key}>
                {columnLabels[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "gray" }} />}
        spacing={3}
        sx={{ mb: 3, justifyContent: "center", flexWrap: "wrap" }}
      >
        <FormControl>
          <FormLabel sx={{ color: "white", mb: 1 }}>Тип диаграммы</FormLabel>
          <RadioGroup
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "bar" | "line")}
          >
            <FormControlLabel
              value="bar"
              control={<Radio sx={{ color: "gray", "&.Mui-checked": { color: "#f27022" } }} />}
              label="Гистограмма"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="line"
              control={<Radio sx={{ color: "gray", "&.Mui-checked": { color: "#f27022" } }} />}
              label="Линейная"
              sx={{ color: "white" }}
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel sx={{ color: "white", mb: 1 }}>На диаграмме показать</FormLabel>
          {yOptions.map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={yKeys.includes(key)}
                  onChange={() => toggleYKey(key)}
                  sx={{ color: "gray", "&.Mui-checked": { color: "#f27022" } }}
                />
              }
              label={columnLabels[key]}
              sx={{ color: "white", "& .MuiTypography-root": { fontSize: "0.85em" } }}
            />
          ))}
        </FormControl>
      </Stack>

      {yKeys.length === 0 ? (
        <Typography sx={{ color: "gray", textAlign: "center", py: 4 }}>
          Выберите хотя бы одно значение для оси Y
        </Typography>
      ) : (
        <Box sx={{ backgroundColor: "#1e1e2e", p: 2, borderRadius: 1 }}>
          {chartType === "bar" ? (
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "group", tickLabelStyle: { fill: "#fff", fontSize: 11 } }]}
              yAxis={[{ tickLabelStyle: { fill: "#fff" } }]}
              series={
                showBarLabel
                  ? series.map((s) => ({
                      ...s,
                      barLabel: (v) => (v !== null ? `${v.value}` : ""),
                    }))
                  : series
              }
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "bottom", horizontal: "center" },
                  sx: { color: "white" },
                },
                barLabel: showBarLabel
                  ? { style: { fill: "white", fontSize: 11, fontWeight: "bold" as const } }
                  : undefined,
              }}
              grid={{ horizontal: true }}
              height={400}
              margin={{ top: 20, right: 20, left: 60, bottom: 60 }}
            />
          ) : (
            <LineChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "group", tickLabelStyle: { fill: "#fff", fontSize: 11 } }]}
              yAxis={[{ tickLabelStyle: { fill: "#fff" } }]}
              series={series.map((s) => ({
                ...s,
                showMark: true,
              }))}
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "bottom", horizontal: "center" },
                  sx: { color: "white" },
                },
              }}
              grid={{ horizontal: true }}
              height={400}
              margin={{ top: 20, right: 20, left: 60, bottom: 60 }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

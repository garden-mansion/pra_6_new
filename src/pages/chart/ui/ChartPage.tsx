import { useState, useMemo } from "react";
import type { FC } from "react";
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { albums } from "../../../app/tableData";
import type { TAlbum } from "../../../app/tableData";
import { columnLabels } from "../../albums/lib/columnLabels";

type XKey = "albumName" | "artist" | "genre" | "country";
type YKey = Exclude<keyof TAlbum, XKey>;
type ChartType = "bar" | "line";

const xOptions: XKey[] = ["albumName", "artist", "genre", "country"];
const yOptions: YKey[] = [
  "yandexMusicPlays",
  "soundcloudPlays",
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

function prepareChartData(
  data: TAlbum[],
  xKey: XKey,
  yKeys: YKey[],
): { categories: string[]; series: { data: number[]; label: string; color: string }[] } {
  const map: Record<string, Record<string, number>> = {};

  data.forEach((item) => {
    const xVal = String(item[xKey]);
    if (!map[xVal]) {
      map[xVal] = {};
    }
    yKeys.forEach((key) => {
      map[xVal][key] = (map[xVal][key] || 0) + Number(item[key]);
    });
  });

  const entries = Object.entries(map);
  const categories = entries.map(([name]) => name);
  const series = yKeys.map((key, idx) => ({
    data: entries.map(([, vals]) => vals[key] || 0),
    label: columnLabels[key],
    color: COLORS[idx % COLORS.length],
  }));

  return { categories, series };
}

export const ChartPage: FC = () => {
  const [xKey, setXKey] = useState<XKey>("artist");
  const [yKeys, setYKeys] = useState<YKey[]>(["yandexMusicPlays", "soundcloudPlays"]);
  const [chartType, setChartType] = useState<ChartType>("bar");

  const toggleYKey = (key: YKey) => {
    setYKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const { categories, series } = useMemo(
    () => (yKeys.length === 0 ? { categories: [], series: [] } : prepareChartData(albums, xKey, yKeys)),
    [xKey, yKeys],
  );



  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Диаграмма
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, flex: "1 1 280px", backgroundColor: "#1e1e2e" }}>
          <FormControl component="fieldset">
            <FormLabel sx={{ color: "white", mb: 1 }}>
              Ось X (группировка)
            </FormLabel>
            <RadioGroup
              value={xKey}
              onChange={(e) => setXKey(e.target.value as XKey)}
            >
              {xOptions.map((key) => (
                <FormControlLabel
                  key={key}
                  value={key}
                  control={<Radio sx={{ color: "gray", "&.Mui-checked": { color: "#f27022" } }} />}
                  label={columnLabels[key]}
                  sx={{ color: "white" }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ p: 2, flex: "1 1 280px", backgroundColor: "#1e1e2e" }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: "white" }}>
            Ось Y (значения)
          </Typography>
          <FormGroup>
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
          </FormGroup>
        </Paper>

        <Paper sx={{ p: 2, flex: "1 1 280px", backgroundColor: "#1e1e2e" }}>
          <FormControl component="fieldset">
            <FormLabel sx={{ color: "white", mb: 1 }}>
              Тип диаграммы
            </FormLabel>
            <RadioGroup
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
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
        </Paper>
      </Box>

      {categories.length > 0 && series.length > 0 ? (
        <Paper sx={{ p: 2, backgroundColor: "#1e1e2e" }}>
          {chartType === "bar" ? (
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: categories,
                  tickLabelStyle: { fill: "#fff", fontSize: 11 },
                },
              ]}
              yAxis={[{ tickLabelStyle: { fill: "#fff" } }]}
              series={series.map((s) => ({
                ...s,
                barLabel: series.length === 1 ? "value" : undefined,
                valueFormatter: (v: number | null) =>
                  v !== null ? v.toLocaleString() : "",
              }))}
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "bottom", horizontal: "center" },
                  sx: { color: "white" },
                },
                barLabel: series.length === 1
                  ? { style: { fill: "white", fontSize: 11, fontWeight: "bold" as const } }
                  : undefined,
              }}
              grid={{ horizontal: true }}
              height={400}
              margin={{ top: 20, right: 20, left: 60, bottom: 60 }}
            />
          ) : (
            <LineChart
              xAxis={[
                {
                  scaleType: "band",
                  data: categories,
                  tickLabelStyle: { fill: "#fff", fontSize: 11 },
                },
              ]}
              yAxis={[{ tickLabelStyle: { fill: "#fff" } }]}
              series={series.map((s) => ({
                ...s,
                showMark: true,
                valueFormatter: (v: number | null) =>
                  v !== null ? v.toLocaleString() : "",
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
        </Paper>
      ) : (
        <Typography sx={{ color: "gray", textAlign: "center", py: 4 }}>
          {yKeys.length === 0
            ? "Выберите хотя бы одно значение для оси Y"
            : "Нет данных"}
        </Typography>
      )}
    </Box>
  );
};

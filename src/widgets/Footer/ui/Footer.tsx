import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: "25px",
      }}
    >
      <Typography
        sx={{
          color: "lightgray",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "0.9em",
          textAlign: "right",
        }}
      >
        выполнил: Кон Владислав (группа: Б9123-09.03.04(1))
      </Typography>
      <Typography
        sx={{
          color: "lightgray",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "0.9em",
          textAlign: "right",
        }}
      >
        год разработки: 2025
      </Typography>
    </Box>
  );
}

import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { Header } from "../../widgets/Header";
import { Footer } from "../../widgets/Footer";

export function Layout() {
  return (
    <Box sx={{ backgroundColor: "rgb(0, 0, 0)", minHeight: "100vh" }}>
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
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

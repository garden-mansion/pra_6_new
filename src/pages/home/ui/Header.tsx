import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const navItems = [
  { label: "Главная", href: "#", active: true },
  { label: "Чарт", href: "#", active: false },
  { label: "Артист месяца", href: "#", active: false },
];

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#121420",
        boxShadow: "none",
        mb: "30px",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          minHeight: { xs: 48, sm: 56 },
        }}
      >
        <Box
          component="img"
          src="/logo.svg"
          alt="logo"
          sx={{
            height: "2em",
            display: { xs: "none", sm: "block" },
          }}
        />

        <Box
          component="nav"
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#272a3f",
            ml: "auto",
          }}
        >
          {navItems.map((item, index) => (
            <Typography
              key={item.label}
              component="a"
              href={item.href}
              sx={{
                color: "whitesmoke",
                textDecoration: "none",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "1.05em",
                fontWeight: "normal",
                px: "20px",
                py: "5px",
                display: "inline-block",
                backgroundColor: item.active ? "#f27022" : "transparent",
                borderRight:
                  index < navItems.length - 1
                    ? "1px solid whitesmoke"
                    : "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: item.active ? "#f27022" : "#3a3f5c",
                },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

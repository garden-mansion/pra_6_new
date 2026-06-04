import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const navItems = [
  { label: "Главная", to: "/", active: true },
  { label: "Чарт", href: "#", active: false },
  { label: "Артист месяца", href: "#", active: false },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            height: "1rem",
            display: 'block',
          }}
        />

        <Box
          component="nav"
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            backgroundColor: "#272a3f",
            ml: "auto",
          }}
        >
          {navItems.map((item, index) => (
            <Typography
              key={item.label}
              component={"to" in item ? RouterLink : "a"}
              {...("to" in item ? { to: item.to } : { href: item.href })}
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

        <Box sx={{ display: { xs: "block", sm: "none" }, ml: "auto" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ color: "whitesmoke" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, left: 0 }}
          open={!!anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPaper-root": {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              margin: 0,
              borderRadius: 0,
              backgroundColor: "#272a3f",
              color: "whitesmoke",
              boxShadow: "none",
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={handleMenuClose}
              component={"to" in item ? RouterLink : "a"}
              {...("to" in item ? { to: item.to } : { href: item.href })}
              sx={{
                fontFamily: "Helvetica, Arial, sans-serif",
                backgroundColor: item.active ? "#f27022" : "transparent",
                "&:hover": {
                  backgroundColor: item.active ? "#f27022" : "#3a3f5c",
                },
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

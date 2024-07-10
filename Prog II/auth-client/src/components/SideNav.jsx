import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";



import "../App.css";

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Button
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{ color: "rgba(177, 160, 0, 1)" }}
        >
          <MenuIcon style={{ fontSize: 40, marginTop: 23, marginBottom: 23 }} />
        </Button>
      </Toolbar>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        sx={[
          {
            "& .MuiDrawer-paper": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          },
          open
            ? {
                "--Drawer-transitionDuration": "0.4s",
                "--Drawer-transitionFunction":
                  "cubic-bezier(0.79,0.14,0.15,0.86)",
              }
            : {
                "--Drawer-transitionDuration": "0.2s",
                "--Drawer-transitionFunction": "cubic-bezier(0.77,0,0.18,1)",
              },
        ]}
      >
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            sx={{ color: "rgba(177, 160, 0, 1)" }}
          >
            <MenuIcon
              style={{ fontSize: 40, marginTop: 23, marginBottom: 23 }}
            />
          </Button>
        </Toolbar>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText
              primary="Adicionar produtos"
              style={{ color: "white" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/menu">
            <ListItemText primary="Cardápio" style={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/promotions">
            <ListItemText primary="Promoções" style={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/testes">
            <ListItemText primary="Usuários" style={{ color: "white" }} />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List sx={{ marginBottom: 1 }}>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" style={{ color: "white" }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default SideNav;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "../App.css";

const SideNav = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
              backgroundColor: "transparent",
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
          <ListItem button component={Link} to="/cardapio">
            <ListItemText primary="Cardápio" style={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/promotions">
            <ListItemText primary="Promoções" style={{ color: "white" }} />
          </ListItem>
          <ListItem button component={Link} to="/testes">
            <ListItemText primary="Usuários" style={{ color: "white" }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default SideNav;

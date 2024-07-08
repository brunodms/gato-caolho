import { useState } from 'react';
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
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Button
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </Button>
      </Toolbar>
      <Drawer
        open={open}
        onClose={handleDrawerClose} 
        sx={[
          {
            '& .MuiDrawer-paper': {
              backgroundColor: 'transparent',
            },
          },
          open
            ? {
                '--Drawer-transitionDuration': '0.4s',
                '--Drawer-transitionFunction': 'cubic-bezier(0.79,0.14,0.15,0.86)',
              }
            : {
                '--Drawer-transitionDuration': '0.2s',
                '--Drawer-transitionFunction': 'cubic-bezier(0.77,0,0.18,1)',
              },
        ]}
      >
        <List style={{ marginTop: '50px' }}>
          <ListItem button>
            <ListItemText primary="Adicionar produtos" style={{ color: 'white' }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Cardápio" style={{ color: 'white' }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Promoções" style={{ color: 'white' }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Usuários" style={{ color: 'white' }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default SideNav;
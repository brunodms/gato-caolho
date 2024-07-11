import {
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import logo from "../assets/logo.png";

import "../App.css";

const Header = () => {
  return (
    <Box sx={{ width: "100vh" }}>
      <AppBar
        sx={{
          backgroundColor: "rgba(30, 3, 40, 1)",
          marginBottom: 20
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Add this line to align items to the right
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ marginTop: 20, height: 60, marginBottom: 20 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
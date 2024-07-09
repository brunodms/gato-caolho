import PropTypes from 'prop-types';
import {
  Box,
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";
import logo from "../assets/logo.png";

import "../App.css";

const Header = ({title}) => {
  return (
    <Box sx={{ width: "100vh" }}>
      <AppBar
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          marginBottom: 20
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ marginTop: 40, height: 60, marginBottom: 10 }}
            />
            <Typography variant="h6" sx={{ color: "#B1A000" }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
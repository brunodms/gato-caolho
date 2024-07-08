import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Box,
    Typography
  } from "@mui/material";
  import logo from "../assets/logo.png";
  
  import "../App.css";
  
  const Header = ({ title }) => {
    return (
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
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
    );
  };

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
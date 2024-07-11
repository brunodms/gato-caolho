import React from "react";

import PropTypes from "prop-types";

import { AppBar, Box, Card, CardActionArea, CardContent, createTheme, ThemeProvider, Typography } from "@mui/material";

import getProduto from "../service/getProduto";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "white",
          backgroundColor: "rgba(108, 11, 142, 1)",
          color: "white",
          "&:hover": {
            backgroundColor: "darkviolet",
            borderColor: "white",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
  },
});
const Produto = ({ produto }) => {
  return (
    <ThemeProvider theme={theme}>
    <Card
      sx={{
        marginTop: 2,
        width: "80%",
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        border: '1px solid white',
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {produto.nome}
          </Typography>
          <Typography color="textSecondary white" gutterBottom>
            {produto.descricao}
          </Typography>
          <Typography variant="body2" component="p">
            {produto.marca}
          </Typography>
          <Typography variant="body2" component="p">
            Valor: R${produto.valor}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </ThemeProvider>
  );
};

Produto.propTypes = {
  produto: PropTypes.shape({
    id_produto: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    valor: PropTypes.any,
  }).isRequired,
};

const Menu = () => {
    const [produtos, setProdutos] = React.useState([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getProduto();
          setProdutos(data);
        } catch (error) {
          console.error("Error fetching produtos:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <>
        <AppBar
          position="static"
          sx={{
            marginTop: 9,
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 2,
          }}
        >
        </AppBar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {produtos.map((produto) => (
            <Produto key={produto.id_produto} produto={produto} />
          ))}
        </Box>
      </>
    );
  };
  
  export default Menu;
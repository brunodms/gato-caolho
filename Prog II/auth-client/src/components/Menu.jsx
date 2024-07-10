import React from "react";
import PropTypes from "prop-types";
import { AppBar, Card, CardContent, Typography, CardActionArea, Box  } from "@mui/material";
import getProduto from "../service/getProduto";

const Produto = ({ produto }) => {
  return (
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
            marginTop: 14,
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
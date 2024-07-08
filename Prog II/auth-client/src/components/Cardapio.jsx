import React from "react";
import PropTypes from "prop-types";
import { AppBar, Card, CardContent, Typography, CardActionArea} from "@mui/material";
import getProduto from "../service/getProduto";

import Header from "./Header";

const Produto = ({ produto }) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {produto.nome}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
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
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
  }).isRequired,
};

const Cardapio = () => {
  const [produtos, setprodutos] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduto();
        setprodutos(data);
      } catch (error) {
        console.error("Error fetching produtos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppBar
      sx={{
        marginTop: 20,
      }}
    >
      <Header title="Cardápio" />
      {produtos.map((produto) => (
        <Produto key={produto.id} produto={produto} />
      ))}
    </AppBar>
  );
};

export default Cardapio;

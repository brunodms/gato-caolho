/* eslint-disable no-unused-vars */

import React, { useState, useEffect} from "react";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Button, createTheme, MenuItem, Stack, TextField, ThemeProvider } from "@mui/material";

import postAddProduct from "../service/postAddProduct";
import getSecao from "../service/getSecao";

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

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    valor: "",
    marca: "",
    unidade_medida: "",
    id_secao: "",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [secoes, setSecoes] = useState([]);

  useEffect(() => {
    const fetchSecoes = async () => {
      try {
        const response = await getSecao();
        setSecoes(response);
      } catch (error) {
        console.error("Error fetching secoes:", error);
      }
    };

    fetchSecoes();
  }, []);
  const handleCloseAlert = () => {
    setErrorMessage("");
  };

  const handleProductAdded = (response) => {
    console.log("Produto adicionado com sucesso", response);
    onProductAdded();
    navigate("/Menu");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      nome: formData.nome,
      descricao: formData.descricao,
      valor: formData.valor,
      marca: formData.marca,
      unidade_medida: formData.unidade_medida,
      id_secao: formData.id_secao,
    };

    try {
     const response = await postAddProduct(data);
     handleProductAdded(response);
    } catch (error) {
      console.log("Erro ao adicionar produto", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            minHeight: "100vw",
          }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Stack
              direction="column"
              spacing={2}
              sx={{ width: "100%", maxWidth: 400 }}
            >
              <Stack direction="column" spacing={2}>
                <TextField
                  id="product_nome"
                  label="Nome"
                  variant="outlined"
                  name="nome"
                  placeholder="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                />
                <TextField
                  id="product_descricao"
                  label="Descrição"
                  variant="outlined"
                  name="descricao"
                  placeholder="descrição"
                  type="text"
                  value={formData.descricao}
                  onChange={handleChange}
                />
                <TextField
                  id="product_valor"
                  label="Valor"
                  variant="outlined"
                  name="valor"
                  placeholder="valor"
                  type="number"
                  value={formData.valor}
                  onChange={handleChange}
                />
                <TextField
                  id="product_marca"
                  label="Marca"
                  variant="outlined"
                  name="marca"
                  placeholder="marca"
                  type="text"
                  value={formData.marca}
                  onChange={handleChange}
                />
                <TextField
                  id="product_unidade_medida"
                  label="Unidade de Medida"
                  variant="outlined"
                  name="unidade_medida"
                  placeholder="unidade de medida"
                  type="text"
                  value={formData.unidade_medida}
                  onChange={handleChange}
                />
                <TextField
                  id="product_secao"
                  label="Seção"
                  variant="outlined"
                  name="id_secao"
                  placeholder="seção"
                  select
                  value={formData.id_secao}
                  onChange={handleChange}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
                >
                {secoes.map((secao) => (
                  <MenuItem key={secao.id_secao} value={secao.id_secao}>
                    {secao.nome}
                  </MenuItem>
                ))}
                </TextField>
                {errorMessage && (
                  <Alert
                    severity="error"
                    onClose={handleCloseAlert}
                    sx={{ mb: 2 }}
                  >
                    {errorMessage}
                  </Alert>
                )}
                <Button
                  id="adicionar_produto"
                  className="Button"
                  variant="outlined"
                  type="submit"
                >
                  Adicionar Produto
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

AddProduct.propTypes = {
  onProductAdded: PropTypes.func.isRequired,
};

export default AddProduct;
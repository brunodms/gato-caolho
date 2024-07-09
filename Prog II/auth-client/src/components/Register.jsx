// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, createTheme, TextField, Box, Stack } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import PropTypes from 'prop-types';

import postRegister from "../service/postRegister";
import Header from "./Header";

const Register = () => {
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    email: "",
    senha: "",
    data_admissao: "",
    id_cargo: "",
    telefone: "",
  });

  const handleRegisterSuccess = (response) => {
    console.log("Registro bem-sucedido", response);
    // Navigate to the login page or perform any other action
  };

  const basics = createTheme({
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      cpf: formData.cpf,
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      data_admissao: formData.data_admissao,
      id_cargo: formData.id_cargo,
      telefone: formData.telefone,
    };

    try {
      const response = await postRegister(data);
      handleRegisterSuccess(response);
    } catch (error) {
      console.log("erro ao registrar", error);
    }
  };

  return (
    <ThemeProvider theme={basics}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "60%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 2
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Header title="Registrar gato caolho" />
        <TextField
          id='register_cpf'
          label="CPF"
          variant="outlined"
          name="cpf"
          placeholder="cpf"
          type="text"
          value={formData.cpf}
          onChange={handleChange}
        />
        <TextField
          id='register_nome'
          label="Nome"
          variant="outlined"
          name="nome"
          placeholder="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
        />
        <TextField
          id='register_email'
          label="Email"
          variant="outlined"
          name="email"
          placeholder="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id='register_senha'
          label="Senha"
          variant="outlined"
          name="senha"
          placeholder="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
        />
        <TextField
          id='register_data_admissao'
          label="Data de Admissão"
          variant="outlined"
          name="data_admissao"
          type="date"
          value={formData.data_admissao}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='register_id_cargo'
          label="ID do Cargo"
          variant="outlined"
          name="id_cargo"
          placeholder="id do cargo"
          type="number"
          value={formData.id_cargo}
          onChange={handleChange}
        />
        <TextField
          id='register_telefone'
          label="Telefone"
          variant="outlined"
          name="telefone"
          placeholder="telefone"
          type="text"
          value={formData.telefone}
          onChange={handleChange}
        />
        <Stack spacing={2} direction="row" sx={{
          "& > :not(style)": { m: 1, width: "60%" },
          justifyContent: "center"
        }}>
          <Button id='registrar' className="Button" variant="outlined" type="submit">
            Registrar
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

Register.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default Register;
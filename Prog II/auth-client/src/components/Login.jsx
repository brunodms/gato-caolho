// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, createTheme, TextField, Box, Stack } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import postLogin from "../service/postLogin";
import Header from "./Header";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log("Login bem-sucedido", response);
    navigate("/cardapio");
  };

  const basics = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderColor: "white",
            backgroundColor: "#6C0B8C",
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
      email: formData.email,
      senha: formData.senha,
    };

    try {
      const response = await postLogin(data);
      handleLoginSuccess(response);
    } catch (error) {
      console.log("erro ao logar", error);
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
        <Header title="Acessar gato caolho" />
        <TextField
          id='login_email'
          label="Email"
          variant="outlined"
          name="email"
          placeholder="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id='login_senha'
          label="Senha"
          variant="outlined"
          name="senha"
          placeholder="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
        />
        <Stack spacing={2} direction="row" sx={{
          "& > :not(style)": { m: 1, width: "60%" },
          justifyContent: "center"
        }}>
          <Button id='entrar' className="Button" variant="outlined" type="submit">
            Entrar
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;

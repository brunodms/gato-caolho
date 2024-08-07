// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Button, createTheme, Divider, Stack, TextField, ThemeProvider } from "@mui/material";

import { AuthContext } from '../context/AuthContext';

import postLogin from "../service/postLogin";

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

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/menu");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleCloseAlert = () => {
    setErrorMessage("");
  };

  const handleLoginSuccess = async (response) => {
    console.log("Login bem-sucedido", response);
    login(response.token, { id_usuario: response.id_usuario, email: formData.email, senha: formData.senha }); // Atualiza o token e usuário no contexto
    navigate("/menu");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

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
      setErrorMessage(error.message);
    }
  };

  return (
    <Box component="div" sx={{ overflow: 'hidden' }}>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            minHeight: "100vw",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Stack
              direction="column"
              spacing={2}
              sx={{ width: "100%", maxWidth: 400 }}
            >
              <Stack direction="column" spacing={2}>
                <TextField
                  id="login_email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  placeholder="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  id="login_senha"
                  label="Senha"
                  variant="outlined"
                  name="senha"
                  placeholder="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                />
                <Button
                  id="entrar"
                  className="Button"
                  variant="outlined"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Entrar
                </Button>
              </Stack>

              {errorMessage && (
                <Alert
                  severity="error"
                  onClose={handleCloseAlert}
                  sx={{ mb: 2 }}
                >
                  {errorMessage}
                </Alert>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Stack direction="column" spacing={2}>
                <Divider
                  sx={{
                    width: "100%",
                    backgroundColor: "yellow",
                  }}
                />
                <Button
                  id="registro"
                  className="Button"
                  variant="outlined"
                  type="submit"
                  onClick={handleRegisterClick}
                  sx={{ width: "100%" }}
                >
                  Registrar-se
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;

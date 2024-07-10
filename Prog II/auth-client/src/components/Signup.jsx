// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Button,
  createTheme,
  TextField,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import postRegister from "../service/postRegister";

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
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleCloseAlert = () => {
    setErrorMessage("");
  };
  const handleRegisterSuccess = (response) => {
    console.log("Registro bem-sucedido", response);
    navigate("/");
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
      setErrorMessage(error.message);
    }
  };

  return (
    <Box>
      <ThemeProvider theme={basics}>
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
                  id="register_cpf"
                  label="CPF"
                  variant="outlined"
                  name="cpf"
                  placeholder="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleChange}
                />
                <TextField
                  id="register_nome"
                  label="Nome"
                  variant="outlined"
                  name="nome"
                  placeholder="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                />
                <TextField
                  id="register_email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  placeholder="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  id="register_senha"
                  label="Senha"
                  variant="outlined"
                  name="senha"
                  placeholder="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                />
                <TextField
                  id="register_data_admissao"
                  label="Data de Admissão"
                  variant="outlined"
                  name="data_admissao"
                  type="date"
                  value={formData.data_admissao}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  id="register_id_cargo"
                  label="ID do Cargo"
                  variant="outlined"
                  name="id_cargo"
                  placeholder="id do cargo"
                  type="number"
                  value={formData.id_cargo}
                  onChange={handleChange}
                />
                <TextField
                  id="register_telefone"
                  label="Telefone"
                  variant="outlined"
                  name="telefone"
                  placeholder="telefone"
                  type="text"
                  value={formData.telefone}
                  onChange={handleChange}
                />
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
                  id="registrar"
                  className="Button"
                  variant="outlined"
                  type="submit"
                >
                  Registrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

Register.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default Register;

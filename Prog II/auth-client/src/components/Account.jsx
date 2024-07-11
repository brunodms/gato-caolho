/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  createTheme,
  MenuItem,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";

import getUserById from "../service/getUsuarioById";
import getCargo from "../service/getCargo";
import getUsuarioById from "../service/getUsuarioById";



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

const Account = () => {
  const id_usuario = localStorage.getItem('id_usuario');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    email: "",
    senha: "",
    data_admissao: "",
    id_cargo: "",
    telefone: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuarioById(id_usuario);
        setFormData({
          cpf: response.cpf,
          nome: response.nome,
          email: response.email,
          senha: response.senha,
          data_admissao: response.data_admissao,
          id_cargo: response.id_cargo,
          telefone: response.telefone,
        });
      } catch (error) {
        console.error("Error fetching usuario:", error);
      }
    };

    fetchUsuario();
  }, [id_usuario]);

  const [cargos, setCargos] = useState([]);
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await getCargo();
        setCargos(response);
      } catch (error) {
        console.error("Error fetching cargos:", error);
      }
    };

    fetchCargos();
  }, []);

  

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
                  id="signup_cpf"
                  label="CPF"
                  variant="outlined"
                  name="cpf"
                  placeholder="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  id="signup_nome"
                  label="Nome"
                  variant="outlined"
                  name="nome"
                  placeholder="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  id="signup_email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  placeholder="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  id="signup_senha"
                  label="Senha"
                  variant="outlined"
                  name="senha"
                  placeholder="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  id="signup_data_admissao"
                  label="Data de Admissão"
                  variant="outlined"
                  name="data_admissao"
                  type="date"
                  value={formData.data_admissao}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <TextField
                  id="signup_select_id_cargo"
                  label="ID do Cargo"
                  variant="outlined"
                  name="id_cargo"
                  placeholder="id do cargo"
                  select
                  value={formData.id_cargo}
                  onChange={handleChange}
                  disabled
                >
                  {cargos.map((cargo) => (
                    <MenuItem key={cargo.id_cargo} value={cargo.id_cargo}>
                      {cargo.cargo}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="signup_telefone"
                  label="Telefone"
                  variant="outlined"
                  name="telefone"
                  placeholder="telefone"
                  type="text"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};
export default Account;

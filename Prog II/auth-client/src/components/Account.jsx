/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "../overflow.css";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";

import getUserById from "../service/getUsuarioById";
import putUser from "../service/putUser";
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
  const id_usuario = localStorage.getItem("id_usuario");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    cpf: 0,
    nome: "",
    email: "",
    senha: "",
    data_admissao: 0,
    id_cargo: 1,
    telefone: 0,
    status: false,
    isEditing: false,
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
          status: response.status,
          isEditing: false,
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
  const handleChangeSuccess = (response) => {
    console.log("Alteração bem-sucedida", response);
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      cpf: formData.cpf,
      email: formData.email,
      nome: formData.nome,
      data_admissao: formData.data_admissao,
      id_cargo: formData.id_cargo,
      telefone: formData.telefone,
      senha: formData.senha,
    };

    try {
      const response = await putUser(data);
      handleChangeSuccess(response);
    } catch (error) {
      console.log("erro ao registrar", error);
      setErrorMessage(error.message);
    }
  };

  const handleStatusChange= (event) => {
    setFormData({ ...formData, status: event.target.checked });
  };

  const handleEditToggle = () => {
    setFormData({ ...formData, isEditing: !formData.isEditing });
  };

  const handleSave = async () => {
    // Add your code to save the updated user data here
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
                  id="account_cpf"
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
                  id="account_email"
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
                  id="account_nome"
                  label="Nome"
                  variant="outlined"
                  name="nome"
                  placeholder="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={!formData.isEditing}
                />
                <TextField
                  id="account_data_admissao"
                  label="Data de Admissão"
                  variant="outlined"
                  name="data_admissao"
                  type="date"
                  value={formData.data_admissao}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <Stack
                  direction="line"
                  spacing={2}
                >
                  <TextField
                    id="account_select_cargo"
                    label="Cargo"
                    variant="outlined"
                    name="cargo"
                    placeholder="cargo"
                    select
                    value={formData.id_cargo}
                    onChange={handleChange}
                    disabled={!formData.isEditing}
                    sx={{ width: "100%", maxWidth: 300 }}
                  >
                    {cargos.map((cargo) => (
                      <MenuItem key={cargo.id_cargo} value={cargo.id_cargo}>
                        {cargo.cargo}
                      </MenuItem>
                    ))}
                  </TextField>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!formData.isEditing}
                        checked={formData.status}
                        onChange={handleStatusChange}
                        name="status"
                        color="primary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "& .MuiCheckbox-root": {
                            backgroundColor: "rgba(108, 11, 142, 1)",
                          },
                          "& .MuiCheckbox-checked": {
                            backgroundColor: "rgba(108, 11, 142, 1)",
                          },
                        }}
                      />
                    }
                    label="Ativo"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "white",
                      },
                    }}
                  />
                </Stack>
                <TextField
                  id="account_telefone"
                  label="Telefone"
                  variant="outlined"
                  name="telefone"
                  placeholder="telefone"
                  type="number"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled={!formData.isEditing}
                />

                <TextField
                  id="account_senha"
                  label="Senha"
                  variant="outlined"
                  name="senha"
                  placeholder="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  disabled={!formData.isEditing}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={handleEditToggle}
                  disabled={formData.isEditing}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSave}
                  disabled={!formData.isEditing}
                >
                  Salvar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};
export default Account;

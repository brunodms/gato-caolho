// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

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

import postSignup from "../service/postSignup";
import getCargo from "../service/getCargo";
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
const Signup = () => {
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    email: "",
    senha: "",
    data_admissao: "",
    id_cargo: "",
    telefone: "",
  });
  const [cargos, setCargos] = useState([]);
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await getCargo(); // Call the getCargo service
        setCargos(response);
      } catch (error) {
        console.error("Error fetching cargos:", error);
      }
    };

    fetchCargos();
  }, []);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleCloseAlert = () => {
    setErrorMessage("");
  };
  const handleSignupSuccess = (response) => {
    console.log("Registro bem-sucedido", response);
    navigate("/");
  };

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
      const response = await postSignup(data);
      handleSignupSuccess(response);
    } catch (error) {
      console.log("erro ao registrar", error);
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
                />
                <TextField
                  id="signup_select_cargo"
                  label="Cargo"
                  variant="outlined"
                  name="cargo"
                  placeholder="cargo"
                  select
                  value={formData.cargo}
                  onChange={handleChange}
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
                  type="number"
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

Signup.propTypes = {
  onSignupSuccess: PropTypes.func.isRequired,
};

export default Signup;

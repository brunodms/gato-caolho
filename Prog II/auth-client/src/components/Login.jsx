import { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, createTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@emotion/react";
import PropTypes from 'prop-types';

import postLogin from "../service/postLogin";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
  };

  const basics = createTheme({
    components: {
        MuiButton: {
          styleOverrides: {
            outlined: {
              borderColor: "white",
              backgroundColor: "purple",
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
      onLoginSuccess(response);
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
      </Box>

      <Stack spacing={2} direction="row" sx={{
        "& > :not(style)": { m: 1, width: "60%" },
        justifyContent: "center"
        }}>
        <Button id='entrar' className="Button" variant="outlined" onClick={handleSubmit}>
          Entrar
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default Login;
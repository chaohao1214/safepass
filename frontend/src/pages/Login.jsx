import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { axiosPost } from "../services/apiClient";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const URL = "";
  const handleLogin = () => {
    axiosPost({
      url: "/api/login",
      data: { email, password },
      onSuccess: (res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      },
      onError: (error) => {
        setError("Login failed: " + error.response?.data?.message || "unknown");
      },
    });
  };
  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        margin="normal"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        margin="normal"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "1rem" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;

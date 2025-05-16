import { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { axiosPost } from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/NotificationProvider";
const LoginRegis = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { errorMessage } = useNotification();
  const toggleMode = () => {
    setShowRegister(!showRegister);
    setError("");
    setEmail("");
    setPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleGoogleLogin = () => {
    try {
      window.location.href = "http://localhost:5000/api/auth/google";
    } catch (error) {
      console.error("Failed to launch Google Login:", error);
      setError("Failed to connect to Google. Please try again.");
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      errorMessage("No email and password");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      errorMessage("Login Failed, Please try again");
      setLoading(false);
      return;
    }

    if (showRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const url = showRegister ? "/api/register" : "/api/login";

    axiosPost({
      url: url,
      data: { email, password },
      onSuccess: (res) => {
        if (showRegister) {
          setShowRegister(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          localStorage.setItem("token", res.data.token);
          window.location.href = "/dashboard";
        }
      },
      onError: (error) => {
        console.log("error11111", error);
        setError(error.response?.data?.message || "An error occurred");
      },
    });
  };

  return (
    <Container>
      <Typography variant="h4">
        {showRegister ? "Register" : "Login"}
      </Typography>
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
      {showRegister && (
        <TextField
          label="Confirm Password"
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "1rem" }}
        onClick={handleSubmit}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : showRegister ? (
          "Register"
        ) : (
          "Login"
        )}
      </Button>
      <Button
        variant="text"
        color="secondary"
        fullWidth
        style={{ marginTop: "0.5rem" }}
        onClick={toggleMode}
      >
        {showRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
    </Container>
  );
};

export default LoginRegis;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { axiosPost, axiosPut } from "../services/apiClient";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotification } from "./NotificationProvider";
const PasswordDialog = ({ open, onClose, onSuccess, passwordData }) => {
  const isEditMode = !!passwordData?.id;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });
  const { errorMessage } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (isEditMode) {
      setFormData({
        website: passwordData.website || "",
        username: passwordData.username || "",
        password: passwordData.password || "",
        notes: passwordData.notes || "",
      });
    } else {
      setFormData({ website: "", username: "", password: "", notes: "" });
    }
  }, [open, passwordData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const hanldeSave = () => {
    if (!formData.website || !formData.username || !formData.password) {
      errorMessage("Website, Username, and Password are required.");
      return;
    }

    const apiFn = isEditMode ? axiosPut : axiosPost;
    const url = isEditMode
      ? `/api/passwords/${passwordData.id}`
      : "/api/passwords";

    apiFn({
      url: url,
      data: formData,
      onSuccess: () => {
        onSuccess();
        onClose();
        setError("");
        setFormData({ website: "", username: "", password: "", notes: "" });
      },
      onError: (error) => {
        console.log(
          `Failed to ${isEditMode ? "Edit" : "Add"} password: ` +
            (error.response?.data?.message || "Unknown error")
        );
        setError(error.response.data?.message || "An error occured");
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEditMode ? "Edit Password" : "Add New Password"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={hanldeSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;

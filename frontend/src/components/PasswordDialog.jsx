import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { axiosPost, axiosPut } from "../services/apiClient";

const PasswordDialog = ({ open, onClose, onSuccess, passwordData }) => {
  const isEditMode = !!passwordData?.id;

  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });

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

  const hanldeSave = () => {
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
        setFormData({ website: "", username: "", password: "", notes: "" });
      },
      onError: (error) => {
        console.log(
          `Failed to ${isEditMode ? "Edit" : "Add"} password: ` +
            (error.response?.data?.message || "Unknown error")
        );
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
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
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

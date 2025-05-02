import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { axiosPost } from "../services/apiClient";

const AddPasswordDialog = ({ open, onClose, onSucess }) => {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hanldeSave = () => {
    axiosPost({
      url: "/api/passwords",
      data: formData,
      onSuccess: () => {
        onSucess();
        onClose();
        setFormData({ website: "", username: "", password: "", notes: "" });
      },
      onError: (error) => {
        console.log(
          "Failed to add password: " +
            (error.response?.data?.message || "Unknown error")
        );
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Password</DialogTitle>
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
      </DialogContent>
      <DialogContent>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={hanldeSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddPasswordDialog;

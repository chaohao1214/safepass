import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Icon,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_COLUMNS } from "./dashboard_constant";
import { axiosDelete, axiosGet } from "../services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import PasswordDialog from "../components/PasswordDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../components/ConfirmDialog";
import BackButton from "../components/BackButton";
import { useNotification } from "../components/NotificationProvider";

const Dashboard = () => {
  const [rows, SetRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const { successMessage, errorMessage } = useNotification();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const handleAddClick = () => {
    setCurrentPassword(null);
    setDialogOpen(true);
  };
  const hanldeCloseDialog = () => {
    setDialogOpen(false);
    setCurrentPassword(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const userInfo = JSON.parse(atob(token.split(".")[1]));
    setUser(userInfo);
    fetchPasswords();
  }, []);

  const fetchPasswords = () => {
    axiosGet({
      url: "/api/passwords",
      onSuccess: (res) => {
        const passwordRecord = res.data.map((item, index) => ({
          id: item._id,
          website: item.website,
          username: item.username,
          password: item.password,
          notes: item.notes || "",
          createdAt: new Date(item.createdAt).toLocaleString(),
        }));
        SetRows(passwordRecord);
        setLoading(false);
      },
      onError: (error) => {
        console.error(error);
        setLoading(false);
      },
    });
  };

  const handleEdit = (row) => {
    setCurrentPassword(row);
    setDialogOpen(true);
  };
  const handleDeleteConfirm = (id) => {
    setDeleteTargetId(id);
    setConfirmOpen(true);
  };
  const handleDelete = () => {
    if (!deleteTargetId) {
      return;
    }

    axiosDelete({
      url: `/api/passwords/${deleteTargetId}`,
      onSuccess: () => {
        fetchPasswords();
        setConfirmOpen(false);
        setDeleteTargetId(null);
        successMessage("The item is removed");
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        setConfirmOpen(false);
        setDeleteTargetId(null);
      },
    });
  };

  const renderColumns = DASHBOARD_COLUMNS.map((col) => {
    if (col.field === "password") {
      return {
        ...col,
        renderCell: (params) => {
          const [show, setShow] = useState(false);
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography>{show ? params.value : "******"}</Typography>
              <IconButton onClick={() => setShow(!show)}>
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          );
        },
      };
    }

    if (col.field === "action") {
      return {
        ...col,
        renderCell: (params) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            {col.actions.map((action) => {
              if (action.type === "edit") {
                return (
                  <Tooltip title="Edit" key={params.id}>
                    <IconButton
                      color={action.color}
                      onClick={() => handleEdit(params.row)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                );
              }
              if (action.type === "delete") {
                return (
                  <Tooltip>
                    <IconButton
                      onClick={() => handleDeleteConfirm(params.row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                );
              }
              return null;
            })}
          </Box>
        ),
      };
    }
    return col;
  });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Password Manager Dashboard</Typography>
        <Typography>Welcome, {user ? user.email : "User"}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add New Password
        </Button>
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={renderColumns}
          pageSize={10}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
      <PasswordDialog
        open={dialogOpen}
        onClose={hanldeCloseDialog}
        onSuccess={fetchPasswords}
        passwordData={currentPassword}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Password Record"
        content="Are you sure you want to delete this password? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setConfirmOpen(false)}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <BackButton />
      </Box>
    </Container>
  );
};

export default Dashboard;

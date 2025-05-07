import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Icon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_COLUMNS } from "./dashboard_constant";
import { axiosDelete, axiosGet } from "../services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import PasswordDialog from "../components/PasswordDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../components/ConfirmDialog";

const Dashboard = () => {
  const [rows, SetRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);

  const navigate = useNavigate();
  const handleAddClick = () => {
    setCurrentPassword(null);
    setDialogOpen(true);
  };
  const hanldeClosDialog = () => {
    setDialogOpen(false);
    setCurrentPassword(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
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

  const handleDeleteConfirm = (id) => {
    setDeleteTargetId(id);
    setConfirmOpen(true);
  };
  const handleDelete = () => {
    if (!deleteTargetId) {
      return;
    }
    axiosDelete({
      url: `api/passwords/${deleteTargetId}`,
      onSuccess: () => {
        fetchPasswords();
        setConfirmOpen(false);
        setDeleteTargetId(null);
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        setConfirmOpen(false);
        setDeleteTargetId(null);
      },
    });
  };
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
          columns={[
            ...DASHBOARD_COLUMNS,
            {
              field: "action",
              headerName: "Action",
              width: 100,
              renderCell: (params) => (
                <>
                  <IconButton
                    title="Edit"
                    color="primary"
                    onClick={() => {
                      setDialogOpen(true);
                      setCurrentPassword(params.row);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    title="Delete"
                    color="error"
                    onClick={() => handleDeleteConfirm(params.row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ),
            },
          ]}
          pageSize={10}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
      <PasswordDialog
        open={dialogOpen}
        onClose={hanldeClosDialog}
        onSucess={fetchPasswords}
        passwordData={currentPassword}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Password Record"
        content="Are you sure you want to delete this password? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </Container>
  );
};

export default Dashboard;

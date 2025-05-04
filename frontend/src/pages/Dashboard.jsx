import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_COLUMNS } from "./dashboard_constant";
import { axiosGet } from "../services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import PasswordDialog from "../components/PasswordDialog";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const [rows, SetRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchPasswords();
  }, []);

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
                <IconButton
                  onClick={() => {
                    setDialogOpen(true);
                    setCurrentPassword(params.row);
                  }}
                >
                  <EditIcon />
                </IconButton>
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
    </Container>
  );
};

export default Dashboard;

import { Container, Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_COLUMNS } from "./dashboard_constant";
import { axiosGet } from "../services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import AddPasswordDialog from "../components/AddPasswordDialog";
const Dashboard = () => {
  const [rows, SetRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDiaglog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const handleOpenDialog = () => setOpenDialog(true);
  const hanldeClosDialog = () => setOpenDialog(false);

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
          onClick={handleOpenDialog}
        >
          Add New Password
        </Button>
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={DASHBOARD_COLUMNS}
          pageSize={10}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
      <AddPasswordDialog
        open={openDiaglog}
        onClose={hanldeClosDialog}
        onSucess={fetchPasswords}
      />
    </Container>
  );
};

export default Dashboard;

import { Container, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DASHBOARD_COLUMNS } from "./dashboard_constant";
import { axiosGet } from "../services/apiClient";
const Dashboard = () => {
  const [rows, SetRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/");
    //   return;
    // }
  });

  axiosGet({
    url: "/api/password",
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
  return (
    <Container>
      <Typography variant="h4">Password Manager Dashboard</Typography>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={DASHBOARD_COLUMNS}
          pageSize={10}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default Dashboard;

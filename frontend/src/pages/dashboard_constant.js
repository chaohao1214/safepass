export const DASHBOARD_COLUMNS = [
  { field: "website", headerName: "Website", width: 200 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "password", headerName: "Password", width: 180, type: "password" },
  { field: "notes", headerName: "Notes", width: 250 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    actions: [
      {
        type: "edit",
        icon: "edit",
        handler: "handleEdit",
        color: "primary",
      },
      {
        type: "delete",
        icon: "delete",
        handler: "handleDeleteConfirm",
        color: "error",
      },
    ],
  },
];

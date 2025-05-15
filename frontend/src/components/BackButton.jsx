import React from "react";
import { Button, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const BackButton = ({
  to = null,
  label = "Back",
  variant = "text",
  size = "medium",
  style = {},
  ...props
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      window.history.back();
    }
  };
  return (
    <Tooltip title="Go Back">
      <Button
        onClick={handleBack}
        variant={variant}
        size={size}
        style={{ ...style }}
        startIcon={<ArrowBackIcon />}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

export default BackButton;

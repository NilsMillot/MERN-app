import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export default function ClosableAlert({ severity, message, onOpenAlert, setOnOpenAlert }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={onOpenAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOnOpenAlert({ opened: false, message: "" });
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

ClosableAlert.propTypes = {
  severity: PropTypes.oneOf(["error" | "info" | "success" | "warning"]),
  message: PropTypes.string.isRequired,
  onOpenAlert: PropTypes.bool.isRequired,
  setOnOpenAlert: PropTypes.func.isRequired
};

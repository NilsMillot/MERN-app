import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CenteredSnackbar({ message, openSnackBar, setOpenSnackBar }) {
  return (
    <Snackbar
      autoHideDuration={2000}
      open={openSnackBar}
      onClose={() => {
        setOpenSnackBar(false);
      }}
      message={message}
      key={"top" + "center"}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpenSnackBar(false);
          }}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    />
  );
}

CenteredSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  openSnackBar: PropTypes.bool.isRequired,
  setOpenSnackBar: PropTypes.func
};

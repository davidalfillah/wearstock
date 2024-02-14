import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";

export const ModalUnstyled = (props) => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [fullScreen, setFullScreen] = React.useState(
    windowSize < 600 ? false : true
  );
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize < 600) {
      setFullScreen(true);
    } else {
      setFullScreen(false);
    }
  });
  return (
    <Dialog fullScreen={fullScreen} open={props.open}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions sx={{ mx: 2, mb: 2 }}>
        <Button onClick={props.handleClose}>cancel</Button>
        {props.disabled && (
          <Button
            disableElevation
            variant="contained"
            onClick={props.hadleSubmit}
          >
            Save
          </Button>
        )}
        {!props.disabled && (
          <Button
            disableElevation
            disabled
            variant="contained"
            onClick={props.hadleSubmit}
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

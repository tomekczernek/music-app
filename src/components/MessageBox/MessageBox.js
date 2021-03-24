import { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function MessageBox({ messageBoxOpen, message, messageBoxClose }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "90%",
      maxWidth: "500px",
      margin: "0 auto",
    },
  }));

  const classes = useStyles();

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={5000}
      open={messageBoxOpen}
      message={message}
      onClose={messageBoxClose}
      action={
        <Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={messageBoxClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );
}

export default MessageBox;

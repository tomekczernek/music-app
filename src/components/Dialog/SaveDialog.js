import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function SaveDialog({ openSaveDialog, closeSaveDialog, saveList }) {
  const [listName, setListName] = useState("");

  const handleListTitle = (event) => {
    setListName(event.target.value);
  };
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: "1rem",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={openSaveDialog}
        onClose={closeSaveDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        id="saveDialog"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Create list</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter name of the track list.</DialogContentText>
          <TextField
            margin="dense"
            label="List name"
            fullWidth
            onChange={handleListTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            onClick={closeSaveDialog}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={saveList({ listName: listName })}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SaveDialog;

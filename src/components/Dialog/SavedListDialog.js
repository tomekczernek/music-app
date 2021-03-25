import { ListItem } from '../Songs';

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

function SavedListDialog({
  openSavedListDialog,
  closeSavedListDialog,
  userSavedLists,
}) {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: "1rem",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={openSavedListDialog}
        onClose={closeSavedListDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        id="savedListDialog"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Your lists</DialogTitle>
        <DialogContent>
          {userSavedLists.length ? (
            userSavedLists.map(item => (
              <ListItem key={item.createDate} listName={item.listName} createDate={item.createDate} />
            ))
          ) : (
            <p>You don't have any saved lists yet.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            onClick={closeSavedListDialog}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SavedListDialog;

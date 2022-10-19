import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export default function AlertDelete({ isDialogOpen, onCloseDialog, onDelete }) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onCloseDialog}
      aria-labelledby="delete-dialog"
    >
      <DialogContent>
        <DialogContentText>Are you sure want to delete?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>Cancel</Button>

        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

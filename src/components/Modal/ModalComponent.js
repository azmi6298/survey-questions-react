import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalComponent({
  isModalOpen,
  isEditModal,
  modalTitle,
  modalContent,
  executeTitle,
  onCloseModal,
  onExecute,
}) {
  return (
    <Dialog open={isModalOpen} onClose={onCloseModal}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {onCloseModal ? (
          <IconButton
            aria-label="close"
            onClick={onCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{modalTitle}</DialogContentText>
        {modalContent}
      </DialogContent>
      {!isEditModal && (
        <DialogActions>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button onClick={onExecute}>{executeTitle}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

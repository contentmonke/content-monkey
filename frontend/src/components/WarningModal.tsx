import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function WarningModal({ open, setOpen, handleConfirm }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to leave this page? Your review data will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>No</Button>
        <Button onClick={handleConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WarningModal;
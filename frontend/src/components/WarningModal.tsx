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
        <Button onClick={() => setOpen(false)}
          sx={{
            color: "#31628F", // Text color
            "&:hover": {
              backgroundColor: "rgba(49, 98, 143, 0.1)", // Hover background color
            },
          }}
        >No</Button>
        <Button onClick={handleConfirm}
          sx={{
            color: "#31628F", // Text color
            "&:hover": {
              backgroundColor: "rgba(49, 98, 143, 0.1)", // Hover background color
            },
          }}
        >Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WarningModal;
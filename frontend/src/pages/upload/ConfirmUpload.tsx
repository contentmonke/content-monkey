import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "../../components/button/Button";
import { uploadReviewsButton } from "../../style/upload-page";

function ConfirmUpload({ open, setOpen, handleConfirm }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to upload these reviews to your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className={'button'}
          style={{ ...uploadReviewsButton, width: '100px' }}
          onClick={() => setOpen(false)}
        >
          No
        </button>
        <Button
          label={"Yes"}
          onClick={() => handleConfirm()}
          width={'100px'}
        />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmUpload;
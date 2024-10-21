import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "../../components/button/Button";

function UploadPopup({ open, setAcknowledgedPopup }: any) {
  return (
    <>
      {open ?
        <Dialog
          open={open}
        >
          <DialogTitle>File Uploaded</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please review the selected book and the contents of your reviews.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              label={"Ok"}
              onClick={() => setAcknowledgedPopup(true)}
              width={'100px'}
            />
          </DialogActions>
        </Dialog>
        :
        <></>
      }
    </>
  );
}

export default UploadPopup;
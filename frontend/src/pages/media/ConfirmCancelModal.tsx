import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmCancelModal: React.FC<ConfirmCancelModalProps> = ({ open, onClose, onConfirm, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="confirm-modal-title" variant="h6" component="h2">
          Confirmation
        </Typography>
        <Typography id="confirm-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmCancelModal;

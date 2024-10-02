import { Container, IconButton } from "@mui/material";
import { modalHeader } from "../../style/review-page";
import { Close } from "@mui/icons-material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function ModalHeader({ media, setModalOpen, setShowWarning }: any) {
  return (
    <Container disableGutters sx={{ ...modalHeader }}>
      <IconButton onClick={() => setShowWarning(true)}>
        <Close />
      </IconButton>
    </Container>
  );
}

export default ModalHeader;
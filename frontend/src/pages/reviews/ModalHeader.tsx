import { Container, IconButton } from "@mui/material";
import { modalHeader } from "../../style/review-page";
import { Close } from "@mui/icons-material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

function ModalHeader({ media, setModalOpen, setShowWarning, handleExpandScreenClick }: any) {
  return (
    <Container disableGutters sx={{ ...modalHeader }}>
      {media === null ?
        <IconButton onClick={() => setModalOpen(false)}>
          <Close />
        </IconButton>
        :
        <IconButton onClick={() => setShowWarning(true)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      }
      <IconButton onClick={handleExpandScreenClick}>
        <OpenInFullIcon />
      </IconButton>
    </Container>
  );
}

export default ModalHeader;
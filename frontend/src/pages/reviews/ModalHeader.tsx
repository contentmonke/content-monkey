import { Container, IconButton } from "@mui/material";
import { modalHeader } from "../../style/review-page";
import { Close } from "@mui/icons-material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import "../upload/UploadPage.css"

export function ModalHeader({ media, setModalOpen, setShowWarning }: any) {
  return (
    <Container disableGutters sx={{ ...modalHeader }}>
      <IconButton onClick={() => setShowWarning(true)}>
        <Close />
      </IconButton>
    </Container>
  );
}

export function UploadModalHeader({ searchIsOpen, setSearchIsOpen, setShowWarning }: any) {
  return (
    <Container disableGutters sx={{ ...modalHeader }}>
      {searchIsOpen ?
        <IconButton onClick={() => setSearchIsOpen(false)}>
          <ArrowBackIosNewIcon />
          <div className="header-text">Back to Review</div>
        </IconButton>
        :
        <>
          <IconButton onClick={() => setShowWarning(true)}>
            <Close />
          </IconButton>
          <IconButton
            onClick={() => setSearchIsOpen(true)}
            sx={{ mx: '5px' }}
          >
            <div className="header-text">Change Book</div>
            < ArrowRightAltIcon fontSize={"large"} />
          </IconButton>
        </>
      }
    </Container>
  );
}
// export default ModalHeader;
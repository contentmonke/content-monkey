import { Container, IconButton } from "@mui/material";
import { modalHeader } from "../../../style/review-page";
import { Close } from "@mui/icons-material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function ModalHeader({ media, setModalOpen, onClose }: any) {
  return (
    <Container disableGutters sx={{ ...modalHeader }}>
      <IconButton onClick={() => onClose}>
        <Close onClick={() => setModalOpen(false)} />
      </IconButton>
    </Container>
  );
}

export function AddContentHeader({ searchIsOpen, setSearchIsOpen, onClose }: any) {
  return (
    <Container disableGutters sx={{ ...modalHeader }}>
      {searchIsOpen ?
        <>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>

        </>
        :
        <>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>

          <IconButton
            onClick={() => setSearchIsOpen(true)}
            sx={{ mx: '5px' }}
          >
            <ArrowBackIosNewIcon />
            <div className="header-text">Back to Search</div>
          </IconButton>
        </>
      }
    </Container>
  );
}
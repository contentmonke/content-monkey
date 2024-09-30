import { Fab, Typography } from "@mui/material";
import { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import CreateReviewModal from './CreateReviewModal';
import { fabButton } from "../../style/review-page";

function CreateReviewButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    setModalOpen(true);
  }

  return (
    <>
      <Fab variant="extended"
        sx={{ ...fabButton }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleClick()}>
        {isHovered ?
          <>
            <CreateIcon sx={{ mr: 1 }} />
            <Typography
              variant={'caption'}
              fontSize={15}>
              Create A Review
            </Typography>
          </>
          :
          <CreateIcon />
        }
      </Fab>
      <CreateReviewModal open={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default CreateReviewButton;
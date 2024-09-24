import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

import CreateReviewModal from './CreateReviewModal';

const fabButtonSx = {
  position: 'fixed',
  bottom: 30,
  right: 30,
  backgroundColor: '#99d2ff',
  '&:hover': {
    bgcolor: '#5db8ff',
  },
}



function CreateReviewButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    console.log("modal open")
    setModalOpen(true);
  }

  return (
    <>
      <Fab variant="extended"
        sx={{ ...fabButtonSx }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleClick()}>
        <AddIcon />
        {isHovered ? "Create New Review" : ""}
      </Fab>
      <CreateReviewModal open={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default CreateReviewButton;
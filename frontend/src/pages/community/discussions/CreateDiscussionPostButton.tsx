import { Fab, Typography } from "@mui/material";
import { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import CreateDiscussionPopup from "./CreateDiscussionPopup";
import { fabButton } from "../../../style/review-page";

function CreateDiscussionPostButton({ discussionBoardId, setNeedsUpdate, setPosts }: any) {
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
              Create A Post
            </Typography>
          </>
          :
          <CreateIcon />
        }
      </Fab>
      <CreateDiscussionPopup
        open={modalOpen}
        setModalOpen={setModalOpen}
        discussionBoardId={discussionBoardId}
        setNeedsUpdate={setNeedsUpdate}
        setPosts={setPosts}
      />
    </>
  );
}

export default CreateDiscussionPostButton;

import { AccountCircle } from "@mui/icons-material";
import { createComment } from "./media-utils";
import { useState } from "react";
import dayjs from "dayjs";

function CreateComment({ userId, reviewId, setIsLoading, setIsSuccess, setIsError, setNeedsUpdate }: any) {
  const [body, setBody] = useState("");

  const handleCreateComment = () => {
    const comment = {
      userId: userId,
      reviewId: reviewId,
      body: body,
      dateCreated: dayjs(),
      replyIds: [],
      upVotes: 0,
      downVotes: 0
    }
    createComment(comment, setBody, setIsLoading, setIsSuccess, setIsError, setNeedsUpdate)
  }

  return (
    <>
      <div className="write-container">
        <div className="your-profile">
          <AccountCircle fontSize="large" />
        </div>
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          <textarea
            className="auto-expand"
            placeholder="Write a comment"
            value={body}
            onChange={(event) => setBody(event.target.value)}>
          </textarea>
        </div>
      </div >
      <div className="button-container">
        <button
          className={'button'}
          style={{ width: '100px', marginLeft: '10px', marginRight: '10px', height: '30px' }}
          onClick={() => handleCreateComment()}
        >
          Create
        </button>
      </div>
    </>
  );
}

export default CreateComment;
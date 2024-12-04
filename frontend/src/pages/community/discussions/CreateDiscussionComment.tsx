
import { Avatar } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { createDiscussionComment } from "./discussion-utils";

function CreateDiscussionComment({ picture, userId, postId, comments, setComments, commentIds, setIsLoading, setIsSuccess, setIsError, setNeedsUpdate, setPosts }: any) {
  const [body, setBody] = useState("");

  const handleCreateComment = () => {
    const comment = {
      userId: userId,
      postId: postId,
      body: body,
      dateCreated: dayjs(),
      replyIds: [],
      upVotes: 0,
      downVotes: 0
    }
    createDiscussionComment(comment, setComments, postId, setBody, setIsLoading, setIsSuccess, setIsError, setNeedsUpdate, setPosts)
  }

  return (
    <>
      <div className="write-container">
        <div className="your-profile">
          <Avatar src={picture ? picture : 'https://via.placeholder.com/150'} style={{ width: '35px', height: '35px' }} />
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
          className='create-comment-button'
          style={{ width: '100px', marginLeft: '10px', marginRight: '10px', height: '30px' }}
          disabled={body === ""}
          onClick={() => handleCreateComment()}
        >
          Create
        </button>
      </div>
    </>
  );
}

export default CreateDiscussionComment;
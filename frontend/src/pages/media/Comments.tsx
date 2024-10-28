import { AccountCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, Container, Divider, IconButton, Rating } from "@mui/material";
import { reviewDetail } from "../../style/media-page";
import { useEffect, useState } from "react";
import { createComment, fetchComments } from "./media-utils";
import { Comment } from "../../models/Models";
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { DateTime } from 'luxon';
import CreateComment from "./CreateComment";
import dayjs from "dayjs";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import { SmallLoading } from "../../components/Loading";
import { loadUser } from "../reviews/review-utils";
import { useAuth0 } from "@auth0/auth0-react";

function Comments({ commentIds, open, reviewId }: any) {

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const { user } = useAuth0();

  useEffect(() => {
    if (open && comments === null) {
      fetchComments(commentIds, setComments, setIsLoading);
    }
  }, [open])

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  return (
    <>
      {open ?
        <>
          <div className="comment-title">
            <div className="line" />
            <div>Comments</div>
            <div className="line" />
          </div>
          {comments?.length > 0 && comments.map((comment, index) => (
            <div key={index}>
              <Container disableGutters sx={{ display: 'flex', my: 1 }}>
                <div className="comment-profile">
                  <AccountCircle fontSize="large" />
                </div>
                <Container disableGutters sx={{ ...reviewDetail }}>
                  <div className="rating-date">
                    <div className="text">{comment.username}</div>
                    <div className="text">
                      {DateTime.fromJSDate(new Date(comment.dateCreated)).toRelative()}</div>
                  </div>
                  {/* <div className="text">
                      {DateTime.fromJSDate(new Date(comment.dateCreated), { zone: 'utc' }).toRelative()}</div>
                  </div> */}
                  <div className="text">{comment.body}</div>
                  <div className="interactive-container">
                    <IconButton size={'small'}>
                      <ThumbUp sx={{ width: 15 }} />
                    </IconButton>
                    <div className="text">{comment.upVotes}</div>
                    <IconButton >
                      <ThumbDown sx={{ width: 15 }} />
                    </IconButton>
                    <div className="text">{comment.downVotes}</div>
                    <Button
                      variant="text"
                      onClick={() => { }}>
                      <ModeCommentRoundedIcon sx={{ width: 15, color: 'grey', marginRight: '5px' }} />
                      <div className="text">{comment.replyIds.length} replies</div>
                    </Button>
                  </div>
                </Container>
              </Container>
              <Divider />
            </div>
          ))}
          <CreateComment
            userId={userData.id}
            reviewId={reviewId}
            setIsLoading={setIsLoading}
            setIsSuccess={setIsSuccess}
            setIsError={setIsError}
          />
          {isLoading && <SmallLoading />}
          <SuccessAlert
            message={"Comment successfully created"}
            showAlert={isSuccess}
            setShowAlert={setIsSuccess}
          />
          <ErrorAlert
            message={"Error creating comment"}
            showAlert={isError}
            setShowAlert={setIsError}
          />
        </>
        :
        <></>
      }
    </>
  );
}

export default Comments;
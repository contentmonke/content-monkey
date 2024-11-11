import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, Container, Divider, IconButton, Avatar } from "@mui/material";
import { reviewDetail } from "../../style/media-page";
import { useEffect, useState } from "react";
import { fetchComments, getRelativeDateString } from "./media-utils";
import { Comment } from "../../models/Models";
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import CreateComment from "./CreateComment";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import { SmallLoading } from "../../components/Loading";
import { loadUser } from "../reviews/review-utils";
import { useAuth0 } from "@auth0/auth0-react";

function Comments({ commentIds, open, reviewId, setNeedsUpdate }: any) {

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [commentPage, setCommentPage] = useState(0);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const { user } = useAuth0();

  const handleMoreCommentsClick = () => {
    setCommentPage(commentPage + 1);
  }

  useEffect(() => {
    if (open) {
      fetchComments(commentIds, commentPage, setComments, setIsLoading);
    }
  }, [open, commentIds, commentPage])

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
                  <Avatar src={comment.picture ? comment.picture : 'https://via.placeholder.com/150'} alt={comment.username} style={{width: '30px', height: '30px' }}/>
                </div>
                <Container disableGutters sx={{ ...reviewDetail }}>
                  <div className="rating-date">
                    <div className="text">{comment.username}</div>
                    <div className="text">
                      {getRelativeDateString(new Date(comment.dateCreated))}</div>
                  </div>
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
          {comments?.length < commentIds.length &&
            <div className="comment-title">
              <div className="line" />
              <button
                className="more-comments"
                onClick={handleMoreCommentsClick}
              >
                Show more comments
              </button>
              <div className="line" />
            </div>
          }
          <CreateComment
            picture={userData?.picture}
            userId={userData?.id}
            reviewId={reviewId}
            setIsLoading={setIsLoading}
            setIsSuccess={setIsSuccess}
            setIsError={setIsError}
            setNeedsUpdate={setNeedsUpdate}
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
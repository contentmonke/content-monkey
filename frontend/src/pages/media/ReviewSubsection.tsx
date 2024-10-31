import { AccountCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, Container, Divider, IconButton, Rating, Typography } from "@mui/material";
import { reviewDetail } from "../../style/media-page";
import { ReviewDTO } from "../../models/Models";
import "./MediaPage.css";
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { DateTime } from 'luxon';
import { formatDate } from "../upload/upload-utils";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser, updateDownVotes, updateUpVotes } from "../reviews/review-utils";

type params = {
  reviews: ReviewDTO[];
  setNeedsUpdate: any;
}

function ReviewSubsection({ reviews, setNeedsUpdate }: params) {

  // const [openComments, setOpenComments] = useState([]);
  const { user } = useAuth0();
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [openComments, setOpenComments] = useState(null);
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  const handleCommentClick = (reviewIndex) => {
    // setOpenComments(indices => [...indices, reviewIndex]);
    setOpenComments(reviewIndex)
  }

  const handleUpVote = (review: ReviewDTO, addedVote: boolean) => {
    if (userData?.posts_disliked.includes(review.id)) {
      return;
    }
    console.log("Upvote");
    console.log("addedVote = " + addedVote);
    updateUpVotes(userData, review.id, addedVote, setUserData, setNeedsUpdate);
  }

  const handleDownVote = (review: ReviewDTO, addedVote: boolean) => {
    if (userData?.posts_liked.includes(review.id)) {
      return;
    }
    console.log("Downvote");
    console.log("addedVote = " + addedVote);
    updateDownVotes(userData, review.id, addedVote, setUserData, setNeedsUpdate);
  }

  return (
    <>
      {reviews.map((review, index) => (
        <div key={index}>
          <Divider />
          <Container disableGutters sx={{ display: 'flex', my: 1 }}>
            <div className="user-info">
              <AccountCircle fontSize="large" />
              <Typography variant="caption">{review.username}</Typography>
            </div>
            <Container disableGutters sx={{ ...reviewDetail }}>
              <div className="rating-date">
                <Rating
                  size={'small'}
                  sx={{ my: 0, mr: 1, mb: 0.5 }}
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
                {/* <div className="text">{DateTime.fromJSDate(new Date(review.dateCreated).getHours() - 4).toRelative(}</div> */}
                <div className="text">{formatDate(review.dateCreated)}</div>
              </div>
              <div className="text">{review.body}</div>
              <div className="interactive-container">
                <IconButton
                  size={'small'}
                  // disabled={!userData?.posts_liked.includes(review.id)}
                  onClick={() => handleUpVote(review, !userData?.posts_liked.includes(review.id))}
                >
                  <ThumbUp
                    sx={{
                      width: 15,
                      color: (userData?.posts_liked.includes(review.id) ? '#31628F' : 'grey')
                    }}
                  />
                </IconButton>
                <div className="text">{review.upVotes}</div>
                <IconButton
                  disabled={!userData}
                  onClick={() => handleDownVote(review, !userData?.posts_disliked.includes(review.id))}
                >
                  <ThumbDown
                    sx={{
                      width: 15,
                      color: (userData?.posts_disliked.includes(review.id) ? '#31628F' : 'grey')
                    }}
                  />
                </IconButton>
                <div className="text">{review.downVotes}</div>
                <Button
                  variant="text"
                  onClick={() => handleCommentClick(index)}>
                  <ModeCommentRoundedIcon sx={{ width: 15, color: 'grey', marginRight: '5px' }} />
                  <div className="text">{review.commentIds.length} comments</div>
                </Button>
              </div>
              <Comments
                commentIds={review.commentIds}
                // open={openComments.includes(index)}
                open={openComments === index}
                reviewId={review.id}
                setNeedsUpdate={setNeedsUpdate}
              />
            </Container>
          </Container>
        </div>
      ))}
    </>
  );
}

export default ReviewSubsection
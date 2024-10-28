import { AccountCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, Container, Divider, IconButton, Rating, Typography } from "@mui/material";
import { reviewDetail } from "../../style/media-page";
import { ReviewDTO } from "../../models/Models";
import "./MediaPage.css";
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { useState } from "react";
import Comments from "./Comments";
import { DateTime } from 'luxon';

type params = {
  reviews: ReviewDTO[];
}

function ReviewSubsection({ reviews }: params) {

  const [openComments, setOpenComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);

  const handleCommentClick = (reviewIndex) => {
    setOpenComments(indices => [...indices, reviewIndex]);
    setCommentPage(commentPage + 1);
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
                {/* <div className="text">{DateTime.fromJSDate(new Date(review.dateCreated), { zone: 'utc' }).toRelative()}</div> */}
                <div className="text">{DateTime.fromJSDate(new Date(review.dateCreated).getHours() - 4).toRelative()}</div>
              </div>
              <div className="text">{review.body}</div>
              <div className="interactive-container">
                <IconButton size={'small'}>
                  <ThumbUp sx={{ width: 15 }} />
                </IconButton>
                <div className="text">{review.upVotes}</div>
                <IconButton >
                  <ThumbDown sx={{ width: 15 }} />
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
                open={openComments.includes(index)}
                reviewId={review.id}
              />
            </Container>
          </Container>
        </div>
      ))}
    </>
  );
}

export default ReviewSubsection
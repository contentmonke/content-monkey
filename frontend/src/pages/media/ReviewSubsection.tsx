import { AccountCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, Container, Divider, IconButton, Rating, Typography } from "@mui/material";
import { reviewDetail, userAccount } from "../../style/media-page";
import { ReviewDTO } from "../../models/Models";
import { useEffect } from "react";

// const reviews = [1, 2, 3, 4]
type params = {
  reviews: ReviewDTO[];
}

function ReviewSubsection({ reviews }: params) {


  return (
    <>
      {reviews.map((review, index) => (
        <div key={index}>
          <Divider />
          <Container disableGutters sx={{ display: 'flex', my: 1 }}>
            <Container disableGutters sx={{ ...userAccount }}>
              <AccountCircle fontSize="large" />
              <Typography variant="caption">{review.username}</Typography>
            </Container>
            <Container disableGutters sx={{ ...reviewDetail }}>
              <Rating
                size={'small'}
                sx={{ my: 0, mr: 1, mb: 0.5 }}
                value={review.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="caption">{review.body}</Typography>
              <Container disableGutters>
                <IconButton size={'small'}>
                  <ThumbUp sx={{ width: 15 }} />
                </IconButton>
                <Typography variant="caption">{review.upVotes}</Typography>
                <IconButton >
                  <ThumbDown sx={{ width: 15 }} />
                </IconButton>
                <Typography variant="caption">{review.downVotes}</Typography>
              </Container>
            </Container>
          </Container>
        </div>
      ))}
    </>
  );
}

export default ReviewSubsection
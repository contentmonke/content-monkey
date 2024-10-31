import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Rating from '@mui/material/Rating';
import { IconButton, Typography, Container } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import CustomPagination from '../../../components/CustomPagination';

interface ReviewEntity {
  id: number;
  body: string;
  dateCreated: string;
  rating: number;
  upVotes: number;
  downVotes: number;
  startDate: string;
  endDate: string;
  reviewDate: string;
  mediaTitle: string;
  mediaType: string;
}

interface ListContentProps {
  reviews: ReviewEntity[];
  type?: string;
}

const ListContent: React.FC<ListContentProps> = ({ reviews, type }) => {
  const [expandedReviewIds, setExpandedReviewIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1); // State to track the current page

  useEffect(() => {
    setPage(1);
  }, [type]);

  const toggleExpansion = (reviewId: number) => {
    setExpandedReviewIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Filter reviews based on mediaType if `type` is provided
  const filteredReviews = type ? reviews.filter(review => review.mediaType === type) : reviews;

  // Paginate the filtered reviews
  const reviewsToDisplay = filteredReviews.slice((page - 1) * 10, page * 10);

  return (
    <div>
      <ul className="content-page-reviews-list">
        {reviewsToDisplay.map((review) => (
          <li key={review.id} className="content-page-review-item">
            <div className="content-page-review-header">
              <p className="content-page-review-title">{review.mediaTitle}</p>
              <Rating
                size="small"
                sx={{ my: 0, mr: 1, mb: 0.5 }}
                value={review.rating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="content-page-dates-container">
              <p className="content-page-review-date">
                {DateTime.fromJSDate(new Date(review.reviewDate)).toRelative()}
              </p>
              <p className="content-page-absolute-date">
                {DateTime.fromJSDate(new Date(review.reviewDate)).toLocaleString(DateTime.DATETIME_MED)}
              </p>
            </div>
            <div className="content-page-date-range">
              {review.startDate && (
                <p className="content-page-start-date">
                  Started: {DateTime.fromJSDate(new Date(review.startDate)).toFormat('MMM dd, yyyy')}
                </p>
              )}
              {review.endDate && review.startDate && <span className="content-page-date-separator"> - </span>}
              {review.endDate && (
                <p className="content-page-end-date">
                  Finished: {DateTime.fromJSDate(new Date(review.endDate)).toFormat('MMM dd, yyyy')}
                </p>
              )}
            </div>
            <div className={`content-page-review-body ${expandedReviewIds.has(review.id) ? 'expanded' : 'collapsed'}`}>
              {review.body}
            </div>
            {review.body.split('\n').length > 3 && (
              <button
                onClick={() => toggleExpansion(review.id)}
                className="content-page-toggle-button"
              >
                {expandedReviewIds.has(review.id) ? 'See Less' : 'See More'}
              </button>
            )}
            <Container disableGutters className="review-vote-container">
              <IconButton size="small">
                <ThumbUp sx={{ width: 15 }} />
              </IconButton>
              <Typography variant="caption">{review.upVotes}</Typography>
              <IconButton size="small">
                <ThumbDown sx={{ width: 15 }} />
              </IconButton>
              <Typography variant="caption">{review.downVotes}</Typography>
            </Container>
          </li>
        ))}
      </ul>

      {/* Pagination Component */}
      <CustomPagination
        scrollRef={null}  // Pass a scrollRef if needed, or keep null if not applicable
        items={filteredReviews}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ListContent;
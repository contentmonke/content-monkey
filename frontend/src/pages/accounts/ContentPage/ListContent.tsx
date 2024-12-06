import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Rating from '@mui/material/Rating';
import { IconButton, Typography, Container } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import CustomPagination from '../../../components/CustomPagination';
import EditReviewModal from './EditReviewModal';
import SuccessAlert from '../../../components/SuccessAlert';
import ErrorAlert from '../../../components/ErrorAlert';
import axios from 'axios';
import dayjs from 'dayjs';

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
  mediaThumbnail: string;
}

interface ListContentProps {
  reviews: ReviewEntity[];
  type?: string;
  handleClick: any,
}

const ListContent: React.FC<ListContentProps> = ({ reviews:initialReviews, type, handleClick }) => {
  const [expandedReviewIds, setExpandedReviewIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1); // State to track the current page
  const [editReview, setEditReview] = useState<ReviewEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewEntity[]>(initialReviews);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const openEditModal = (review: ReviewEntity) => {
      setEditReview(review);
      setIsModalOpen(true);
    };

    const closeEditModal = () => {
      setEditReview(null);
      setIsModalOpen(false);
    };

    const updateReview = async (reviewId: number, updatedReview: Partial<ReviewEntity>) => {
      const response = await axios.put(`http://localhost:8080/api/reviews/${reviewId}`, updatedReview);
      return response.data;
    };

    const handleSaveReview = async (updatedReview: Partial<ReviewEntity>) => {
      try {
        // Call the API to update the review
        console.log(updatedReview);
        const updatedReviews = {
          ...updatedReview,
          startDate: updatedReview.startDate ? dayjs(updatedReview.startDate).format("YYYY-MM-DDTHH:mm:ss") : null,
          endDate: updatedReview.endDate ? dayjs(updatedReview.endDate).format("YYYY-MM-DDTHH:mm:ss") : null,
        };
        const updatedData = await updateReview(updatedReviews.id, updatedReviews);

        // Update the local state with the updated review data
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === updatedReviews.id ? { ...review, ...updatedReviews } : review
          )
        );

        setIsSuccess(true);
        closeEditModal();
      } catch (error) {
        setIsError(true);
      }
    };

  useEffect(() => {
      // Simulate loading and populate reviews
      setReviews(initialReviews);
    }, [initialReviews]);

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
            <div className="content-page-review-thumbnail" onClick={() => handleClick(review)}>
              <img src={review.mediaThumbnail} alt="Thumbnail" />
            </div>
            <div className="content-page-review-content">
              <div className="content-page-review-header">
                <p className="content-page-review-title" onClick={() => handleClick(review)}>{review.mediaTitle}</p>
                <Rating
                  size="small"
                  sx={{ my: 0, mr: 1, mb: 0.5 }}
                  value={review.rating}
                  precision={0.5}
                  onClick={() => openEditModal(review)}
                 />
              </div>
              <div className="content-page-dates-container">
                <p className="content-page-review-date">
                  {DateTime.fromJSDate(new Date(review.reviewDate)).minus({hours: 1}).toRelative()}
                </p>
                <p className="content-page-absolute-date" onClick={() => openEditModal(review)}>
                  {DateTime.fromJSDate(new Date(review.reviewDate)).minus({hours: 1}).toLocaleString(DateTime.DATETIME_MED)}
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
              <div className="content-page-date-range">
                   {review.progress}
              </div>
              <div className={`content-page-review-body ${expandedReviewIds.has(review.id) ? 'expanded' : 'collapsed'}`} onClick={() => openEditModal(review)}>
                {review.body}
              </div>
              {((review.body.length > 200) || (review.body.split("\n").length > 2)) && (
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
            </div>
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
      <SuccessAlert
              message="Review updated successfully."
              showAlert={isSuccess}
              setShowAlert={setIsSuccess}
            />
      <ErrorAlert
              message="Failed to update profile. Try again later."
              showAlert={isError}
              setShowAlert={setIsError}
            />
      {editReview && (
              <EditReviewModal
                open={isModalOpen}
                review={editReview}
                handleClose={closeEditModal}
                handleSave={handleSaveReview}
              />
            )}
    </div>
  );
};

export default ListContent;
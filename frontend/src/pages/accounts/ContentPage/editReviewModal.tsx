import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'; // Add this for date picking functionality
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'; // Use Luxon for date handling
import { DateTime } from 'luxon';

interface EditReviewModalProps {
  open: boolean;
  review: ReviewEntity | null;  // Ensure review is a full ReviewEntity type
  handleClose: () => void;
  handleSave: (updatedReview: ReviewEntity) => void;  // Handle full ReviewEntity
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({
  open,
  review,
  handleClose,
  handleSave,
}) => {
  const [body, setBody] = useState(review?.body || '');
  const [rating, setRating] = useState(review?.rating || 0);
  const [startDate, setStartDate] = useState<DateTime | null>(
    review?.startDate ? DateTime.fromISO(review.startDate) : null
  );
  const [endDate, setEndDate] = useState<DateTime | null>(
    review?.endDate ? DateTime.fromISO(review.endDate) : null
  );

  React.useEffect(() => {
    if (review) {
      setBody(review.body);
      setRating(review.rating);
      setStartDate(review.startDate ? DateTime.fromISO(review.startDate) : null);
      setEndDate(review.endDate ? DateTime.fromISO(review.endDate) : null);
    }
  }, [review]);

  const handleSaveClick = () => {
    if (review) {
      const updatedReview: ReviewEntity = {
        ...review,  // Spread the original review to keep the unchanged properties
        body,       // Updated body
        rating,     // Updated rating
        startDate: startDate ? startDate.toISODate() : null,  // Updated start date
        endDate: endDate ? endDate.toISODate() : null,        // Updated end date
      };
      handleSave(updatedReview); // Pass the updated review with all the properties
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Review</DialogTitle>
      <DialogContent>
        <TextField
          label="Review Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue || 0)}
          precision={0.5}
          sx={{ mt: 2 }}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditReviewModal;

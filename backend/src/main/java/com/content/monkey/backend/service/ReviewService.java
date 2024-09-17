package com.content.monkey.backend.service;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.exceptions.UserNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewEntity> getAllReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAll();
        return reviews;
    }

    public ReviewEntity getReviewById(Long reviewId) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException());
        return review;
    }

    public List<ReviewEntity> getListOfReviews(List<Long> reviewIds) {
        return reviewRepository.findAllById(reviewIds);
    }

    public ReviewEntity createReview(ReviewEntity review) {
        return reviewRepository.save(review);
    }

    public ReviewEntity editReview(Long reviewId, ReviewEntity newReviewEntity) {
        Optional<ReviewEntity> optionalReviewEntity = reviewRepository.findById(reviewId);
        if (optionalReviewEntity.isPresent()) {
            ReviewEntity reviewEntity = optionalReviewEntity.get();
            reviewEntity.setUserId(newReviewEntity.getUserId());
            reviewEntity.setCommentIds(new ArrayList<>(newReviewEntity.getCommentIds()));
            reviewEntity.setDateCreated(newReviewEntity.getDateCreated());
            reviewEntity.setBody(newReviewEntity.getBody());
            reviewEntity.setMediaId(newReviewEntity.getMediaId());
            reviewEntity.setRating(newReviewEntity.getRating());
            reviewEntity.setUpVotes(newReviewEntity.getUpVotes());
            reviewEntity.setDownVotes(newReviewEntity.getDownVotes());
            reviewRepository.save(reviewEntity);
            return null;
        }
        return reviewRepository.save(newReviewEntity);
    }

    public void deleteReview(Long reviewId) throws UserNotFoundException{
        try {
            reviewRepository.deleteById(reviewId);
        } catch (Exception e) {
            throw new UserNotFoundException();
        }
    }

}

package com.content.monkey.backend.service;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewEntity> getAllReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAll();
        return reviews;
    }

    public ResponseEntity<ReviewEntity> getReviewById(Long reviewId) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException());
        return new ResponseEntity<>(review, HttpStatus.FOUND);
    }

    public ResponseEntity<List<ReviewEntity>> getListOfReviews(List<Long> reviewIds) {
        List<ReviewEntity> reviews = reviewRepository.findAllById(reviewIds);
        return new ResponseEntity<List<ReviewEntity>>(reviews, HttpStatus.FOUND);
    }

    public ResponseEntity<ReviewEntity> createReview(ReviewEntity review) {
        ReviewEntity savedReview = reviewRepository.save(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    public ResponseEntity<ReviewEntity> editReview(Long reviewId, ReviewEntity newReviewEntity) {
        return reviewRepository.findById(reviewId)
                .map(reviewEntity -> {
                    reviewEntity.setUserId(newReviewEntity.getUserId());
                    reviewEntity.setCommentIds(new ArrayList<>(newReviewEntity.getCommentIds()));
                    reviewEntity.setDateCreated(newReviewEntity.getDateCreated());
                    reviewEntity.setBody(newReviewEntity.getBody());
                    reviewEntity.setMediaId(newReviewEntity.getMediaId());
                    reviewEntity.setRating(newReviewEntity.getRating());
                    reviewEntity.setUpVotes(newReviewEntity.getUpVotes());
                    reviewEntity.setDownVotes(newReviewEntity.getDownVotes());
                    reviewEntity = reviewRepository.save(reviewEntity);
                    return new ResponseEntity<ReviewEntity>(reviewEntity, HttpStatus.OK);
                })
                .orElseGet(() -> {
                    ReviewEntity reviewEntity = reviewRepository.save(newReviewEntity);
                    return new ResponseEntity<ReviewEntity>(reviewEntity, HttpStatus.OK);
                });

    }

}

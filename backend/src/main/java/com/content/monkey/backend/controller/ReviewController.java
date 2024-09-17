package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.service.ReviewService;
import com.content.monkey.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;

    @GetMapping()
    public List<ReviewEntity> getAllReviews() {
        List<ReviewEntity> reviews = reviewService.getAllReviews();
        return reviews;
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewEntity> getReviewsById(@PathVariable("reviewId") Long reviewId) {
        ResponseEntity<ReviewEntity> response = reviewService.getReviewById(reviewId);
        return response;
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<ReviewEntity>> getReviewsByUserId(@PathVariable Long userId) {
        ResponseEntity<UserEntity> response = userService.getUser(userId);

        List<Long> reviewIds = response.getBody().getReviewIds();

        ResponseEntity<List<ReviewEntity>> reviewsResponse = reviewService.getListOfReviews(reviewIds);
        return reviewsResponse;
    }

    @PostMapping()
    public ResponseEntity<ReviewEntity> createReview(@RequestBody ReviewEntity reviewEntityDTO) {
        return reviewService.createReview(reviewEntityDTO);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewEntity> editReview(@PathVariable Long reviewId, @RequestBody ReviewEntity newReviewEntity) {
        return reviewService.editReview(reviewId, newReviewEntity);
    }



}

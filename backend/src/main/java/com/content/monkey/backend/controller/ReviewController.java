package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.dto.UploadResultDTO;
import com.content.monkey.backend.service.ReviewService;
import com.content.monkey.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.content.monkey.backend.model.dto.ActivityWithUser;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<ReviewEntity>> getAllReviews() {
        List<ReviewEntity> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok().body(reviews);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewEntity> getReviewsById(@PathVariable("reviewId") Long reviewId) {
        ReviewEntity review = reviewService.getReviewById(reviewId);
        return ResponseEntity.ok().body(review);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<ReviewEntity>> getReviewsByUserId(@PathVariable Long userId) {
        List<ReviewEntity> userReviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok().body(userReviews);
    }

    @PostMapping()
    public ResponseEntity<ReviewEntity> createReview(@RequestBody ReviewEntity reviewEntity) {
        ReviewEntity newEntity = reviewService.createReview(reviewEntity);
        if (newEntity == null) {
            return ResponseEntity.noContent().build();
        }
        URI uri = URI.create("/api/reviews/" + newEntity.getId());
        return ResponseEntity.created(uri).body(newEntity);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewEntity> editReview(@PathVariable Long reviewId, @RequestBody ReviewEntity newReviewEntity) {
        ReviewEntity reviewEntity = reviewService.editReview(reviewId, newReviewEntity);
        // Successfully updated
        if (reviewEntity == null) {
            return ResponseEntity.noContent().build();
        }
        // Created new object
        URI uri = URI.create("/api/reviews/" + reviewEntity.getId());
        return ResponseEntity.created(uri).body(reviewEntity);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<List<UploadResultDTO>> uploadReviews(@RequestParam("file") MultipartFile file) throws IOException {
        List<UploadResultDTO> uploadedReviews = reviewService.upload(file);

        return ResponseEntity.ok().body(uploadedReviews);

    }

    @PostMapping("/confirmUploads/{userId}")
    public ResponseEntity<List<ReviewEntity>> confirmUploads(
            @PathVariable("userId") Long userId,
            @RequestBody() List<UploadResultDTO> uploadResults) throws IOException {

        List<ReviewEntity> reviewEntities = reviewService.confirmUploads(userId, uploadResults);
        return ResponseEntity.ok().body(reviewEntities);

    }

    @GetMapping("/upVotes/{userId}")
    public ResponseEntity<ReviewEntity> upVotes(@PathVariable Long userId,
                                                    @RequestParam Long reviewId,
                                                    @RequestParam boolean addedVote) {
        ReviewEntity reviewEntity = reviewService.upVotes(userId, reviewId, addedVote);
        // Successfully updated
        if (reviewEntity == null) {
            return ResponseEntity.noContent().build();
        }
        // Created new object
        URI uri = URI.create("/api/reviews/downVotes/" + reviewEntity.getId());
        return ResponseEntity.created(uri).body(reviewEntity);
    }

    @GetMapping("/downVotes/{userId}")
    public ResponseEntity<ReviewEntity> downVotes(@PathVariable Long userId,
                                                    @RequestParam Long reviewId,
                                                    @RequestParam boolean addedVote) {
        ReviewEntity reviewEntity = reviewService.downVotes(userId, reviewId, addedVote);
        // Successfully updated
        if (reviewEntity == null) {
            return ResponseEntity.noContent().build();
        }
        // Created new object
        URI uri = URI.create("/api/reviews/downVotes/" + reviewEntity.getId());
        return ResponseEntity.created(uri).body(reviewEntity);
    }
    
    // Endpoint to get all reviews and comments by user ID (user activities)
    @GetMapping("/userId/{userId}/activity")
    public ResponseEntity<List<Object>> getUserActivities(@PathVariable Long userId) {
        List<Object> activities = reviewService.getUserActivities(userId);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/userId/{userId}/friends/activity")
    public ResponseEntity<List<ActivityWithUser>> getFriendsActivities(@PathVariable Long userId) {
        List<ActivityWithUser> activities = reviewService.getFriendsActivities(userId);
        return ResponseEntity.ok(activities);
    }
}

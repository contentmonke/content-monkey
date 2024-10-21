package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.dto.UploadResultDTO;
import com.content.monkey.backend.service.ReviewService;
import com.content.monkey.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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




}

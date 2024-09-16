package com.content.monkey.backend.controller;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.ReviewEntityDTO;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    @GetMapping()
    public List<ReviewEntity> getAllReviews() {
        List<ReviewEntity> reviews = reviewService.getAllReviews();
        return reviews;
    }

//    @PostMapping()
//    public ResponseEntity<Object> createReview(@RequestBody ReviewEntityDTO reviewDTO) {
////        ReviewEntity review = new ReviewEntity();
////        return reviewService.createReview(review);
//        return;
//    }



}

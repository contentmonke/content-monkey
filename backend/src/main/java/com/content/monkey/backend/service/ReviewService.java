package com.content.monkey.backend.service;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.ReviewEntityDTO;
import com.content.monkey.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewEntity> getAllReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAll();
        System.out.println("ReviewRepo returned:" + reviews);
        return reviews;
    }

    public ResponseEntity<Object> createReview(ReviewEntity review) {
//        System.out.println("Before save: " + reviewDTO);
        reviewRepository.save(review);
//        System.out.println("After save: " + reviewDTO);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }


}

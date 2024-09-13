package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<ReviewEntity> getAllReviews() {
        System.out.println("Reviews Controller");
        List<ReviewEntity> reviews = reviewService.getAllReviews();
        return reviews;
    }

}

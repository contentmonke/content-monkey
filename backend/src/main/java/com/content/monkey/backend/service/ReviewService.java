package com.content.monkey.backend.service;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewEntity> getAllReviews() {
        System.out.println("ReviewService");
        List<ReviewEntity> reviews = reviewRepository.findAll();
        System.out.println("ReviewRepo returned:" + reviews);
        return reviews;
    }
}

package com.content.monkey.backend.controller;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.exceptions.UserNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.service.ReviewService;
import com.content.monkey.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReviewController.class)
public class ReviewControllerTests {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ReviewService reviewService;
    @MockBean
    private UserService userService;
    private ReviewEntity reviewEntity;

    @BeforeEach
    public void init() {
        reviewEntity = ReviewEntity.builder()
                .userId(1L)
                .commentIds(new ArrayList<>())
                .dateCreated(LocalDateTime.now())
                .body("This is the body")
                .mediaId(3L)
                .rating(3)
                .upVotes(54)
                .downVotes(2)
                .startDate(null)
                .endDate(null)
                .build();
    }

    @Test
    public void ReviewController_getAllReviews_ReturnsReviewEntity() throws Exception {
        when(reviewService.getAllReviews()).thenReturn(Collections.singletonList(reviewEntity));

        this.mockMvc.perform(get("/api/reviews"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(reviewEntity.getBody())));
    }

    @Test
    public void ReviewController_getReviewsById_ReturnsReviewEntity() throws Exception {
        Long reviewId = 3L;
        when(reviewService.getReviewById(reviewId)).thenReturn(reviewEntity);

        this.mockMvc.perform(get("/api/reviews/" + reviewId))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(reviewEntity.getBody())));
    }

    @Test
    public void ReviewController_getReviewsById_ThrowsException() throws Exception {
        Long reviewId = 3L;
        when(reviewService.getReviewById(reviewId)).thenThrow(ReviewNotFoundException.class);
        this.mockMvc.perform(get("/api/reviews/" + reviewId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void ReviewController_getReviewsByUserId_ReturnsReviewEntity() throws Exception {
        Long userId = 2L;
        Long reviewId = 3L;
        List<Long> reviewIds = Collections.singletonList(reviewId);
        UserEntity user = UserEntity.builder()
                .name("Jane").reviewIds(reviewIds).build();
        when(userService.getUser(userId)).thenReturn(user);
        when(reviewService.getListOfReviews(reviewIds)).thenReturn(Collections.singletonList(reviewEntity));

        this.mockMvc.perform(get("/api/reviews/userId/" + userId))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(reviewEntity.getBody())));
    }

    @Test
    public void ReviewController_getReviewsByUserId_ThrowsException() throws Exception {
        Long userId = 3L;
        when(userService.getUser(userId)).thenThrow(UserNotFoundException.class);
        this.mockMvc.perform(get("/api/reviews/userId/" + userId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void ReviewController_createReview_ReturnsReviewEntity() throws Exception {
        Long reviewId = 3L;
        String reviewEntityJson = "{\"userId\": 1," +
                "\"commentIds\": []," +
                "\"dateCreated\": \"2024-09-14T18:45:00\"," +
                "\"body\": \"This is the body\"," +
                "\"mediaId\": 3," +
                "\"rating\": 3," +
                "\"upVotes\": 54," +
                "\"downVotes\": 2," +
                "\"startDate\": \"\", " +
                "\"endDate\": \"\"}";
        when(reviewService.createReview(reviewEntity)).thenReturn(reviewEntity);

        this.mockMvc.perform(post("/api/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reviewEntityJson))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(reviewEntity.getBody())));
    }

}

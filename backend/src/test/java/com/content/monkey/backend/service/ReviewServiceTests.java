package com.content.monkey.backend.service;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.repository.ReviewRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDateTime;
import java.util.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ReviewServiceTests {

    @Mock
    private ReviewRepository reviewRepository;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private ReviewService reviewService;
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
    public void ReviewService_getAllReviews_ReturnsList() {
        when(reviewRepository.findAll()).thenReturn(Collections.singletonList(reviewEntity));

        List<ReviewEntity> reviewEntities = reviewService.getAllReviews();

        Assertions.assertThat(reviewEntities.size()).isEqualTo(1);
        Assertions.assertThat(reviewEntities.get(0).getBody()).isEqualTo(reviewEntity.getBody());
    }

    @Test
    public void ReviewService_getReviewById_ReturnsReviewEntity() {
        Long reviewEntityId = 3L;
        when(reviewRepository.findById(reviewEntityId)).thenReturn(Optional.of(reviewEntity));

        ReviewEntity returnedReviewEntity = reviewService.getReviewById(reviewEntityId);

        Assertions.assertThat(returnedReviewEntity).isNotNull();
        Assertions.assertThat(returnedReviewEntity.getBody()).isEqualTo(reviewEntity.getBody());
    }

    @Test
    public void ReviewService_getReviewById_ThrowsException() {
        Long reviewEntityId = 3L;
        when(reviewRepository.findById(reviewEntityId)).thenReturn(Optional.empty());

        assertThrows(ReviewNotFoundException.class, () -> {
            reviewService.getReviewById(reviewEntityId);
        });
    }

    @Test
    public void ReviewService_getListOfReviews_ReturnsList() {
        List<Long> reviewIds = Arrays.asList(1L,2L);
        ReviewEntity reviewEntityTwo = ReviewEntity.builder()
                .userId(2L).commentIds(new ArrayList<>())
                .dateCreated(LocalDateTime.now())
                .body("Second body").mediaId(1L)
                .rating(5).upVotes(34).downVotes(10).startDate(null)
                .endDate(null).build();

        when(reviewRepository.findAllById(reviewIds)).thenReturn(Arrays.asList(reviewEntity, reviewEntityTwo));

        List<ReviewEntity> reviewEntities = reviewService.getListOfReviews(reviewIds);

        Assertions.assertThat(reviewEntities.size()).isEqualTo(2);
    }

    @Test
    public void ReviewService_createReview_ReturnsReviewEntity() {

        when(reviewRepository.save(Mockito.any(ReviewEntity.class))).thenReturn(reviewEntity);

        ReviewEntity savedReview = reviewService.createReview(reviewEntity);

        Assertions.assertThat(savedReview).isNotNull();
    }

    @Test
    public void ReviewService_editReview_ReturnsNewReviewEntity() {
        Long reviewId = 3L;

        when(reviewRepository.findById(reviewId)).thenReturn(Optional.empty());
        when(reviewRepository.save(reviewEntity)).thenReturn(reviewEntity);

        ReviewEntity newReviewEntity = reviewService.editReview(reviewId, reviewEntity);

        Assertions.assertThat(newReviewEntity).isNotNull();
        Assertions.assertThat(newReviewEntity.getBody()).isEqualTo(reviewEntity.getBody());

    }

    @Test
    public void ReviewService_editReview_ReturnsNull() {
        Long reviewId = 3L;
        ReviewEntity updatedReviewEntity = ReviewEntity.builder()
                .userId(1L).commentIds(new ArrayList<>()).dateCreated(LocalDateTime.now())
                .body("New body yay").mediaId(3L).rating(3)
                .upVotes(54).downVotes(2).startDate(null)
                .endDate(null).build();

        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(reviewEntity));
        when(reviewRepository.save(updatedReviewEntity)).thenReturn(updatedReviewEntity);

        ReviewEntity savedReviewEntity = reviewService.editReview(reviewId, updatedReviewEntity);

        Assertions.assertThat(savedReviewEntity).isNull();

    }

    @Test
    public void ReviewService_deleteReview_ReturnsNothing() {
        Long reviewId = 3L;
        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(reviewEntity));

        reviewService.deleteReview(reviewId);
    }

}

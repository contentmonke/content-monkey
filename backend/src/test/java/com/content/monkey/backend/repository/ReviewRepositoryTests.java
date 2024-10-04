package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.ReviewEntity;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase()
public class ReviewRepositoryTests {

    @Autowired ReviewRepository reviewRepository;
    private ReviewEntity reviewEntity;
    @MockBean
    private RestTemplate restTemplate;

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
    public void ReviewRepository_Save_ReturnsReviewEntity() {
        ReviewEntity savedReviewEntity = reviewRepository.save(reviewEntity);

        Assertions.assertThat(savedReviewEntity).isNotNull();
        Assertions.assertThat(savedReviewEntity.getId()).isGreaterThan(0);
    }

    @Test
    public void ReviewRepository_FindAll_ReturnsListOfReviewEntities() {
        ReviewEntity reviewEntityTwo = ReviewEntity.builder()
                .userId(2L).commentIds(new ArrayList<>())
                .dateCreated(LocalDateTime.now())
                .body("Second body").mediaId(1L)
                .rating(5).upVotes(34).downVotes(10).startDate(null)
                .endDate(null).build();

        reviewRepository.save(reviewEntity);
        reviewRepository.save(reviewEntityTwo);

        List<ReviewEntity> reviewEntities = reviewRepository.findAll();

        Assertions.assertThat(reviewEntities).isNotNull();
        Assertions.assertThat(reviewEntities.size()).isEqualTo(2);
    }

    @Test
    public void ReviewRepository_FindById_ReturnsReviewEntity() {
        reviewRepository.save(reviewEntity);
        Optional<ReviewEntity> returnedReviewEntity = reviewRepository.findById(reviewEntity.getId());

        Assertions.assertThat(returnedReviewEntity.isPresent()).isTrue();
        Assertions.assertThat(returnedReviewEntity.get().getId()).isEqualTo(reviewEntity.getId());

    }

    @Test
    public void ReviewRepository_FindById_ReturnsNothing() {
        Optional<ReviewEntity> returnedReviewEntity = reviewRepository.findById(1L);

        Assertions.assertThat(returnedReviewEntity.isPresent()).isFalse();
    }

    @Test
    public void ReviewRepository_DeleteById_ReturnsEmptyReview() {
        reviewRepository.save(reviewEntity);
        reviewRepository.deleteById(reviewEntity.getId());
        Optional<ReviewEntity> returnedReviewEntity = reviewRepository.findById(reviewEntity.getId());

        Assertions.assertThat(returnedReviewEntity.isPresent()).isFalse();
    }
}

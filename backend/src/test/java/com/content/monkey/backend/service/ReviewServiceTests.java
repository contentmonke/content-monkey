package com.content.monkey.backend.service;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.dto.ActivityWithUser;
import com.content.monkey.backend.model.CommentEntity;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.ReviewRepository;
import com.content.monkey.backend.repository.MediaRepository;
import com.content.monkey.backend.repository.CommentRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.junit.jupiter.api.Assertions.*;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.client.RestTemplate;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ReviewServiceTests {

    @Mock
    private ReviewRepository reviewRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    @Mock
    private CommentRepository commentRepository;
    @Mock
    private CommentService commentService;
    @InjectMocks
    private ReviewService reviewService;
    private ReviewEntity reviewEntity;
    @Mock
    private MediaRepository mediaRepository;
    @MockBean
    private RestTemplate restTemplate;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
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
        Long userId = 2L;

        when(reviewRepository.save(Mockito.any(ReviewEntity.class))).thenReturn(reviewEntity);
        when(userService.getUser(userId)).thenReturn(new UserEntity());

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
    public void ReviewService_deleteReview_ReturnsNothing() throws Exception {
        Long reviewId = 3L;
        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(reviewEntity));

        reviewService.deleteReview(reviewId);
    }

    @Test
    public void testGetFriendsActivities() {
        // Setup mock data
        Long userId = 1L;
        Long friendId = 2L;
        UserEntity user = new UserEntity();
        user.setId(userId);
        user.setFriend_list(Collections.singletonList(String.valueOf(friendId))); // Use `setFriend_list` here

        UserEntity friend = new UserEntity();
        friend.setId(friendId);
        friend.setName("FriendName");

        // Mock ReviewEntity and CommentEntity data
        ReviewEntity review = new ReviewEntity();
        review.setDateCreated(LocalDateTime.now().minusDays(1));
        review.setUserId(friendId);
        review.setMediaId(10L); // Set a media ID for the review

        CommentEntity comment = new CommentEntity();
        comment.setDateCreated(LocalDateTime.now().minusDays(2));
        comment.setUserId(friendId);

        // Mock media response
        MediaEntity media = new MediaEntity();
        media.setId(10L);
        media.setMediaTitle("Sample Media Title");

        // Define behavior for mocks
        when(userService.getUser(userId)).thenReturn(user);
        when(userService.getUser(friendId)).thenReturn(friend);
        when(reviewRepository.findByUserId(friendId)).thenReturn(Collections.singletonList(review));
        when(commentRepository.findByUserId(friendId)).thenReturn(Collections.singletonList(comment));
        when(mediaRepository.findById(10L)).thenReturn(Optional.of(media)); // Mock media repository

        // Execute the method to be tested
        List<ActivityWithUser> result = reviewService.getFriendsActivities(userId);

        // Verify the result
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("FriendName", result.get(0).getUserName());
        assertTrue(result.get(0).getDateCreated().isAfter(result.get(1).getDateCreated()));

        // Verify interactions with mocks
        verify(userService, times(1)).getUser(userId);
        verify(userService, times(1)).getUser(friendId);
        verify(reviewRepository, times(1)).findByUserId(friendId);
        verify(commentRepository, times(1)).findByUserId(friendId);
        verify(mediaRepository, times(1)).findById(10L);
    }

    @Test
    public void testGetFriendsActivities_InvalidFriendId() {
        // Mock user with invalid friend ID
        Long userId = 1L;
        UserEntity user = new UserEntity();
        user.setId(userId);
        user.setFriend_list(Collections.singletonList("invalidId"));

        when(userService.getUser(userId)).thenReturn(user);

        // Execute the method to be tested
        List<ActivityWithUser> result = reviewService.getFriendsActivities(userId);

        // Verify result is empty due to invalid friend ID
        assertNotNull(result);
        assertTrue(result.isEmpty());

        // Verify interactions with mocks
        verify(userService, times(1)).getUser(userId);
    }
}

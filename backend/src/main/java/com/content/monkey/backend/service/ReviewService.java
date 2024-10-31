package com.content.monkey.backend.service;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.GoodReadsDTO;
import com.content.monkey.backend.model.dto.UploadResultDTO;
import com.content.monkey.backend.repository.ReviewRepository;
import com.content.monkey.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;
    @Autowired
    private MediaService mediaService;
    @Autowired
    private SearchService searchService;
    @Autowired
    private UserRepository userRepository;

    // HELPER FUNCTIONS
    private static LocalDateTime formatGoodReadsDate(String date) {
        if (date.isEmpty()) {
            return null;
        }
        DateTimeFormatter inputFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate localDate = LocalDate.parse(date, inputFormat);

        return localDate.atStartOfDay();
    }

    private String simplifyMediaTitle(String mediaTitle) {
        int delimiterIndex = mediaTitle.indexOf('(');
        String title = mediaTitle;

        if (delimiterIndex != -1) {
            title = mediaTitle.substring(0, delimiterIndex - 1); // "Hello"
        }
        return title;
    }

    private List<UploadResultDTO> convertGoodReadsToUploadResult(List<GoodReadsDTO> goodReadsDTOS) {
        List<UploadResultDTO> uploadResultDTOS = new ArrayList<>();
        for (GoodReadsDTO dto : goodReadsDTOS) {
            String mediaTitle = simplifyMediaTitle(dto.getTitle());
            System.out.println("============================================");
            System.out.println("Simplified Title = " + mediaTitle);
            // Create Search Entity
            SearchEntity searchEntity = null;
            if (!mediaTitle.isEmpty()) {
                if (dto.getAuthor() == null || dto.getAuthor().equals("Unknown")) {
                    dto.setAuthor("");
                }
                searchEntity = searchService.getSearchResultsByTitleAndAuthor(mediaTitle, dto.getAuthor());
            }

            LocalDateTime dateAdded = formatGoodReadsDate(dto.getDateAdded());
            LocalDateTime dateRead = formatGoodReadsDate(dto.getDateRead());
            LocalDateTime dateEnded = dateRead == null ? dateAdded : dateRead;

            // Create ReviewEntity
            ReviewEntity reviewEntity = ReviewEntity.builder()
                            .userId(null)
                            .commentIds(new ArrayList<>())
                            .dateCreated(dateAdded)
                            .body(dto.getMyReview())
                            .mediaId(null)
                            .rating(dto.getMyRating())
                            .upVotes(0)
                            .downVotes(0)
                            .startDate(dateEnded)
                            .endDate(dto.getReadingStatus().equals("currently-reading") ? null
                                    : dateEnded)
                            .build();

            // Append Upload Results
            uploadResultDTOS.add(
                    UploadResultDTO.builder()
                            .searchEntity(searchEntity)
                            .reviewEntity(reviewEntity)
                            .build()
            );
        }
        System.out.println("convertGoodReadsToUploadResult results");
        System.out.println(uploadResultDTOS);

        return uploadResultDTOS;
    }

    // API SERVICES
    public List<ReviewEntity> getAllReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAll();
        return reviews;
    }

    public ReviewEntity getReviewById(Long reviewId) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException());
        return review;
    }

    public List<ReviewEntity> getListOfReviews(List<Long> reviewIds) {
        return reviewRepository.findAllById(reviewIds);
    }

    public List<ReviewEntity>getReviewsByUserId(Long userId) {
        try {
            List<Long> reviewIds = userService.getUser(userId).getReviewIds();
            return reviewRepository.findAllById(reviewIds);
        } catch (Exception e) {
            return null;
        }
    }

    public ReviewEntity createReview(ReviewEntity review) {
        // avoid duplicates
        List<ReviewEntity> reviewEntity = reviewRepository.findByMediaIdAndUserId(review.getMediaId(), review.getUserId());
        if (!reviewEntity.isEmpty()) {
            System.out.println("Already have a review for this media");
            return null;
        }
        ReviewEntity savedEntity = reviewRepository.save(review);
        userService.addReviewIdToUser(savedEntity.getUserId(), savedEntity.getId());
        return savedEntity;
    }

    public ReviewEntity editReview(Long reviewId, ReviewEntity newReviewEntity) {
        Optional<ReviewEntity> optionalReviewEntity = reviewRepository.findById(reviewId);
        if (optionalReviewEntity.isPresent()) {
            ReviewEntity reviewEntity = optionalReviewEntity.get();
            reviewEntity.setUserId(newReviewEntity.getUserId());
            reviewEntity.setCommentIds(new ArrayList<>(newReviewEntity.getCommentIds()));
            reviewEntity.setDateCreated(newReviewEntity.getDateCreated());
            reviewEntity.setBody(newReviewEntity.getBody());
            reviewEntity.setMediaId(newReviewEntity.getMediaId());
            reviewEntity.setRating(newReviewEntity.getRating());
            reviewEntity.setUpVotes(newReviewEntity.getUpVotes());
            reviewEntity.setDownVotes(newReviewEntity.getDownVotes());
            reviewRepository.save(reviewEntity);
            return null;
        }
        return reviewRepository.save(newReviewEntity);
    }

    public void deleteReview(Long reviewId) throws ReviewNotFoundException{
        ReviewEntity reviewEntity = getReviewById(reviewId);
        try {
            commentService.deleteListOfComments(reviewEntity.getCommentIds());
            reviewRepository.deleteById(reviewId);
        } catch (Exception e) {
            throw new ReviewNotFoundException();
        }
    }

    public List<UploadResultDTO> upload(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            System.out.println("file is empty");
        }
        // Read CSV file
        InputStream inputStream = file.getInputStream();
        final CsvMapper csvMapper = new CsvMapper();
        List<GoodReadsDTO> goodReadsReviews = new ArrayList<>();
        try {
            CsvSchema csvSchema = csvMapper
                    .schemaFor(GoodReadsDTO.class)
                    .withHeader()
                    .withColumnSeparator(',')
                    .withColumnReordering(true);

            MappingIterator<GoodReadsDTO> iterator = csvMapper
                    .readerFor(GoodReadsDTO.class)
                    .with(csvSchema)
                    .readValues(inputStream);

            goodReadsReviews = iterator.readAll();

        } catch(Exception e) {
            System.out.println(e);
            return new ArrayList<>();
        }

        System.out.println(goodReadsReviews);

        // TODO - Remove this filter for unread books (when To-Read list is implemented)
        goodReadsReviews.removeIf(item -> item.getReadingStatus().equals("to-read"));

        // Convert GoodReads data to UploadResults
        List<UploadResultDTO> uploadResultDTOS = convertGoodReadsToUploadResult(goodReadsReviews);
        return uploadResultDTOS;
    }

    public List<ReviewEntity> confirmUploads(Long userId, List<UploadResultDTO> uploadResultDTOS) {
        List<ReviewEntity> reviewEntities = new ArrayList<>();
        for (UploadResultDTO dto : uploadResultDTOS) {
            MediaEntity mediaEntity = mediaService.getOrCreateMediaEntity(dto.getSearchEntity());
            dto.getReviewEntity().setUserId(userId);
            dto.getReviewEntity().setMediaId(mediaEntity.getId());
//            reviewEntities.add(dto.getReviewEntity());
            reviewEntities.add(
                    createReview(dto.getReviewEntity())
            );
        }
        return reviewEntities;
    }

    public ReviewEntity upVotes(Long userId, Long reviewId, boolean addedVote) {
        List<ReviewEntity> reviewEntities = reviewRepository.findByid(reviewId);
        if (reviewEntities.size() == 0) {
            return null;
        }
        ReviewEntity reviewEntity = reviewEntities.get(0);
        reviewEntity.setUpVotes(reviewEntity.getUpVotes() + (addedVote ? 1 : -1));
        System.out.println("Setting reviewUpvotes to " + reviewEntity.getUpVotes());
        ReviewEntity updatedReview = reviewRepository.save(reviewEntity);
        try {
            UserEntity user = userService.getUser(userId);
            if (user.getPosts_liked() == null) {
                user.setPosts_liked(new ArrayList<>());
            }
            if (addedVote) {
                user.getPosts_liked().add(reviewId);
            } else {
                user.getPosts_liked().remove(reviewId);
            }
            System.out.println("Setting user's liked posts to " + user.getPosts_liked());
            userRepository.save(user);
        } catch(Exception e) {
            System.out.println("Error updating the user's upVotes");
        }
        return updatedReview;
//        return null;
    }

    public ReviewEntity downVotes(Long userId, Long reviewId, boolean addedVote) {
        List<ReviewEntity> reviewEntities = reviewRepository.findByid(reviewId);
        if (reviewEntities.size() == 0) {
            return null;
        }
        ReviewEntity reviewEntity = reviewEntities.get(0);
        reviewEntity.setDownVotes(reviewEntity.getDownVotes() + (addedVote ? 1 : -1));
        System.out.println("Setting reviewDownvotes to " + reviewEntity.getDownVotes());
        ReviewEntity updatedReview = reviewRepository.save(reviewEntity);
        try {
            UserEntity user = userService.getUser(userId);
            if (user.getPosts_disliked() == null) {
                user.setPosts_disliked(new ArrayList<>());
            }
            if (addedVote) {
                user.getPosts_disliked().add(reviewId);
            } else {
                user.getPosts_disliked().remove(reviewId);
            }
            System.out.println("Setting user's disliked posts to " + user.getPosts_disliked());
            userRepository.save(user);
        } catch(Exception e) {
            System.out.println("Error updating the user's downvotes");
            System.out.println(e);
        }
//        return null;
        return updatedReview;
    }

}

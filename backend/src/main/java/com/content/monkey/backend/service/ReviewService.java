package com.content.monkey.backend.service;

import com.content.monkey.backend.exceptions.ReviewNotFoundException;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.dto.GoodReadsDTO;
import com.content.monkey.backend.repository.ReviewRepository;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    private List<ReviewEntity> convertGoodReadsToReviewEntities(List<GoodReadsDTO> goodReadsDTOS, Long userId) {
        List<ReviewEntity> reviewEntities = new ArrayList<>();
        for (GoodReadsDTO dto : goodReadsDTOS) {
            // Find MediaEntity
            String mediaTitle = simplifyMediaTitle(dto.getTitle());
            System.out.println("============================================");
            System.out.println("Simplified Title = " + mediaTitle);
            MediaEntity mediaEntity = null;
            if (!mediaTitle.isEmpty()) {
                mediaEntity = mediaService.getOrSearchAndCreateMediaEntity(mediaTitle, dto.getAuthor());
            }

            LocalDateTime dateAdded = formatGoodReadsDate(dto.getDateAdded());
            LocalDateTime dateRead = formatGoodReadsDate(dto.getDateRead());
            LocalDateTime dateEnded = dateRead == null ? dateAdded : dateRead;

            // Create ReviewEntity
            reviewEntities.add(
                    ReviewEntity.builder()
                            .userId(userId)
                            .commentIds(new ArrayList<>())
                            .dateCreated(dateAdded)
                            .body(dto.getMyReview())
                            .mediaId((mediaEntity == null) ? null : mediaEntity.getId())
                            .rating(dto.getMyRating())
                            .upVotes(0)
                            .downVotes(0)
                            .startDate(dateEnded)
                            .endDate(dto.getReadingStatus().equals("currently-reading") ? null
                                    : dateEnded)
                            .build()
            );
        }
        System.out.println("convertGoodReadsToReviewEntities results");
        System.out.println(reviewEntities);

        return reviewEntities;
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

    public List<ReviewEntity> upload(MultipartFile file, Long userId) throws IOException {
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

        // Convert GoodReads data to ReviewEntities
        List<ReviewEntity> reviewEntities = convertGoodReadsToReviewEntities(goodReadsReviews, userId);
        return reviewEntities;
//        return new ArrayList<>();
    }

}

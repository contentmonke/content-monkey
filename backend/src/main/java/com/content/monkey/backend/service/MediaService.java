package com.content.monkey.backend.service;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.MediaEntityDTO;
import com.content.monkey.backend.model.dto.ReviewEntityDTO;
import com.content.monkey.backend.repository.MediaRepository;
import com.content.monkey.backend.repository.ReviewRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private SearchService searchService;

    public MediaEntityDTO getMediaByTitle(String title, int pageNumber, int pageSize) {
        List<MediaEntity> mediaEntity = mediaRepository.findByMediaTitle(title);
        if (mediaEntity.isEmpty()) {
            return null;
        }

        int numReviews = reviewRepository.countByMediaId(mediaEntity.get(0).getId());
        List<ReviewEntity> reviewEntities = reviewRepository.findAllByMediaId(
                mediaEntity.get(0).getId(),
                PageRequest.of(pageNumber, pageSize)
        );
        float sumReviews = reviewRepository.getSumRatings(mediaEntity.get(0).getId());
        float averageRating = (float) Math.round((sumReviews / (float) numReviews) * 2) / 2;


        List<ReviewEntityDTO> reviewEntityDTOs = new ArrayList<>();
        UserEntity user = null;

        for (ReviewEntity entity: reviewEntities) {
            try {
                user = userService.getUser(entity.getUserId());
                reviewEntityDTOs.add(
                        ReviewEntityDTO.convertReviewEntityToDTO(entity, user.getName())
                );
            } catch(Exception e) {
                System.out.println("User " + entity.getUserId() + " is not found, skipping this review");
            }
        }

        Collections.sort(reviewEntityDTOs);

        MediaEntityDTO mediaEntityDTO = MediaEntityDTO.convertMediaEntityToDTO(
                mediaEntity.get(0),
                reviewEntityDTOs,
                numReviews,
                averageRating);

        return mediaEntityDTO;

    }

    public MediaEntity getMediaByTitleAndAuthor(String title, String author, int pageNumber, int pageSize) {
        List<MediaEntity> mediaEntities = mediaRepository.findByMediaTitleAndAuthor(title, author);
        if (mediaEntities.isEmpty()) {
            return null;
        }

        MediaEntity mediaEntity = mediaEntities.get(0);

        int numReviews = reviewRepository.countByMediaId(mediaEntity.getId());
        float sumReviews = reviewRepository.getSumRatings(mediaEntity.getId());
        float averageRating = (float) Math.round((sumReviews / (float) numReviews) * 2) / 2;

        mediaEntity.setAverageRating(averageRating);
        mediaEntity.setTotalRatings(numReviews);  // TODO - change this number when we allow ratings w/o reviews

        return mediaEntity;

    }

    public MediaEntity getMediaByID(Long mediaID) {
        List<MediaEntity> mediaEntity = mediaRepository.findByid(mediaID);
        if (mediaEntity.isEmpty()) {
            return null;
        }
        return mediaEntity.get(0);
    }

    public MediaEntityDTO createMediaEntity(MediaEntity mediaEntity) {
        MediaEntity savedMediaEntity = mediaRepository.save(mediaEntity);
        return MediaEntityDTO.convertMediaEntityToDTO(savedMediaEntity, new ArrayList<>(), 0, 0);
    }

    public MediaEntity createMediaEntityNoDTO(MediaEntity mediaEntity) {
        return mediaRepository.save(mediaEntity);
    }

    private MediaEntity convertSearchEntityToMediaEntity(SearchEntity searchEntity) {
        if (searchEntity == null) {
            return null;
        }
        MediaEntity mediaEntity = MediaEntity
                .builder()
                .mediaTitle(searchEntity.getTitle())
                .mediaDuration(Integer.parseInt(searchEntity.getPageCount()))
                .author(searchEntity.getAuthors().isEmpty() ? null : searchEntity.getAuthors().get(0))
                .description(searchEntity.getDescription())
                .averageRating(0)
                .totalRatings(0)
                .thumbnail(searchEntity.getThumbnail())
                .mediaType("Book")
                .build();
        return mediaEntity;
    }
    public MediaEntity getOrCreateMediaEntity(SearchEntity searchEntity) {
        MediaEntity mediaEntity = getMediaByTitleAndAuthor(
                searchEntity.getTitle(),
                searchEntity.getAuthors().isEmpty() ? "" : searchEntity.getAuthors().get(0),
                0,
                10
        );
        if (mediaEntity == null) {
            System.out.println("Media not in database...");
            mediaEntity = convertSearchEntityToMediaEntity(searchEntity);
            mediaEntity = createMediaEntityNoDTO(mediaEntity);
            System.out.println("Created " + mediaEntity);
        }
        return mediaEntity;
    }

    public List<MediaEntity> getMediaList(List<Long> mediaIds) {
        return mediaRepository.findAllById(mediaIds);
    }
}

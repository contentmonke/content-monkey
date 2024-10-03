package com.content.monkey.backend.service;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.MediaEntityDTO;
import com.content.monkey.backend.model.dto.ReviewEntityDTO;
import com.content.monkey.backend.repository.MediaRepository;
import com.content.monkey.backend.repository.ReviewRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserService userService;


    public MediaEntityDTO getMediaByTitle(String title, int pageNumber, int pageSize) {
        List<MediaEntity> mediaEntity = mediaRepository.findByMediaTitle(title);

        if (mediaEntity.isEmpty()) {
            return null;
        }

        int numReviews = reviewRepository.countByMediaId(mediaEntity.getFirst().getId());
        List<ReviewEntity> reviewEntities = reviewRepository.findAllByMediaId(
                mediaEntity.getFirst().getId(),
                PageRequest.of(pageNumber, pageSize)
        );

        float sumReviews = reviewRepository.getSumRatings(mediaEntity.getFirst().getId());
        float averageRating = (float) Math.round((sumReviews / (float) numReviews) * 2) / 2;


        List<ReviewEntityDTO> reviewEntityDTOs = new ArrayList<>();
        UserEntity user = null;

        for (ReviewEntity entity: reviewEntities) {
            user = userService.getUser(entity.getUserId());
            reviewEntityDTOs.add(
                    ReviewEntityDTO.convertReviewEntityToDTO(entity, user.getName())
            );
        }

        MediaEntityDTO mediaEntityDTO = MediaEntityDTO.convertMediaEntityToDTO(
                mediaEntity.getFirst(),
                reviewEntityDTOs,
                numReviews,
                averageRating);

        return mediaEntityDTO;
    }

    public MediaEntity getMediaByID(Long mediaID) {
        List<MediaEntity> mediaEntity = mediaRepository.findByid(mediaID);
        if (mediaEntity.isEmpty()) {
            return null;
        }
        return mediaEntity.getFirst();
    }

    public MediaEntity createMediaEntity(MediaEntity mediaEntity) {
        return mediaRepository.save(mediaEntity);
    public MediaEntityDTO createMediaEntity(MediaEntity mediaEntity) {
        MediaEntity savedMediaEntity = mediaRepository.save(mediaEntity);
        return MediaEntityDTO.convertMediaEntityToDTO(savedMediaEntity, new ArrayList<>(), 0, 0);
    }
}

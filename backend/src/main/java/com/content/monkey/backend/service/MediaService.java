package com.content.monkey.backend.service;

import com.content.monkey.backend.model.BooksApiModels.GoogleBooksResponse;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.MediaEntityDTO;
import com.content.monkey.backend.model.dto.ReviewEntityDTO;
import com.content.monkey.backend.repository.MediaRepository;
import com.content.monkey.backend.repository.ReviewRepository;
import com.content.monkey.backend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;

import javax.print.attribute.standard.Media;
import java.net.URI;
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

    @Autowired
    private Environment environment;
    @Autowired
    private RestTemplate template = new RestTemplate();

    public MediaEntityDTO getMediaByTitle(String title, int pageNumber, int pageSize) {
        List<MediaEntity> mediaEntity = mediaRepository.findByMediaTitle(title);
        if (mediaEntity.isEmpty()) {
            return null;
        }

        int numReviews = reviewRepository.countByMediaIdAndRatingNot(mediaEntity.get(0).getId(), 0);
        System.out.println(numReviews);
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
                        ReviewEntityDTO.convertReviewEntityToDTO(entity, user.getUsername(), user.getPicture())
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

    public MediaEntityDTO getMediaByTitleAndType(String title, String type, int pageNumber, int pageSize) throws JsonProcessingException {
        List<MediaEntity> mediaEntity = mediaRepository.findByMediaTitleAndMediaType(title, type);
        if (mediaEntity.isEmpty()) {
            return null;
        }

        MediaEntity entity = mediaEntity.get(0);
        if (entity.getStreamingService() == null && (entity.getMediaType().equals("Movie") || entity.getMediaType().equals("TV Show"))) {
            entity.setStreamingService(getStreamingServiceByTitle(entity.getMediaTitle(), "us"));
        }

        int numReviews = reviewRepository.countByMediaIdAndRatingNot(mediaEntity.get(0).getId(), 0);
        List<ReviewEntity> reviewEntities = reviewRepository.findAllByMediaId(
                mediaEntity.get(0).getId(),
                PageRequest.of(pageNumber, pageSize)
        );
        float sumReviews = reviewRepository.getSumRatings(mediaEntity.get(0).getId());
        float averageRating = (float) Math.round((sumReviews / (float) numReviews) * 2) / 2;


        List<ReviewEntityDTO> reviewEntityDTOs = new ArrayList<>();
        UserEntity user = null;

        for (ReviewEntity reviewEntity: reviewEntities) {
            try {
                user = userService.getUser(reviewEntity.getUserId());
                reviewEntityDTOs.add(
                        ReviewEntityDTO.convertReviewEntityToDTO(reviewEntity, user.getUsername(), user.getPicture())
                );
            } catch(Exception e) {
                System.out.println("User " + reviewEntity.getUserId() + " is not found, skipping this review");
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

        int numReviews = reviewRepository.countByMediaIdAndRatingNot(mediaEntity.getId(), 0);
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

    public MediaEntityDTO createMediaEntity(MediaEntity mediaEntity) throws JsonProcessingException {
        if (mediaEntity.getMediaType().equals("Movie") || mediaEntity.getMediaType().equals("TV Show")) {
            mediaEntity.setStreamingService(getStreamingServiceByTitle(mediaEntity.getMediaTitle(), "us"));
        }
        MediaEntity savedMediaEntity = mediaRepository.save(mediaEntity);
        return MediaEntityDTO.convertMediaEntityToDTO(savedMediaEntity, new ArrayList<>(), 0, 0);
    }

    public String getStreamingServiceByTitle(String mediaTitle, String countryCode) throws JsonProcessingException {
        String apiKey = environment.getProperty("CM_UTELLY_KEY");

        URI uri = UriComponentsBuilder.fromHttpUrl("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup")
                .queryParam("term", mediaTitle)
                .queryParam("country", countryCode)
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.exchange(uri, HttpMethod.GET, entity, String.class);

        String responseBody = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(responseBody);

        JsonNode results = root.path("results");

        ArrayList<String> streamingLocations = new ArrayList<>();

        for (JsonNode result : results) {
            JsonNode locations = result.path("locations");
            for (JsonNode location : locations) {
                String displayName = location.path("display_name").asText();

                if ( !displayName.equals("Amazon Instant Video") && !displayName.equals("iTunes")
                        && !streamingLocations.contains(displayName)) {
                    streamingLocations.add(displayName);
                }
            }
        }
        if (!streamingLocations.isEmpty()) {
            return streamingLocations.toString();
        }
        return "Not Available";
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
                .mediaType(searchEntity.getMediaType())
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

package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.service.UserService;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MediaEntityDTO {
    private Long id;
    private String mediaTitle;
    private int mediaDuration;
    private String author;
    private String genre;
    private String description;
    private float averageRating;
    private int totalRatings;
    private String thumbnail;
    private String mediaType;
    private List<ReviewEntityDTO> reviews;
    private int numTotalReviews;
    private String streamingService;

    public static MediaEntityDTO convertMediaEntityToDTO(MediaEntity mediaEntity,
                                                         List<ReviewEntityDTO> reviewEntities,
                                                         int numTotalReviews,
                                                         float averageRating) {

        return new MediaEntityDTO(
                mediaEntity.getId(),
                mediaEntity.getMediaTitle(),
                mediaEntity.getMediaDuration(),
                mediaEntity.getAuthor(),
                mediaEntity.getGenre(),
                mediaEntity.getDescription(),
                averageRating,
//                mediaEntity.getTotalRatings(),  //TODO - allow ratings w/o review
                numTotalReviews,
                mediaEntity.getThumbnail(),
                mediaEntity.getMediaType(),
                reviewEntities,
                numTotalReviews,
                mediaEntity.getStreamingService()
        );
    }

    @Override
    public String toString() {
        return "MediaEntityDTO{" +
                "id=" + id +
                ", mediaTitle='" + mediaTitle + '\'' +
                ", mediaDuration=" + mediaDuration +
                ", author='" + author + '\'' +
                ", genre='" + genre + '\'' +
                ", description='" + description + '\'' +
                ", averageRating=" + averageRating +
                ", totalRatings=" + totalRatings +
                ", thumbnail='" + thumbnail + '\'' +
                ", mediaType='" + mediaType + '\'' +
                ", reviews=" + reviews +
                '}';
    }
}

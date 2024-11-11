package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewEntityDTO implements Comparable<ReviewEntityDTO>{
    private Long id;
    private Long userId;
    private String username;
    private String picture;
    private List<Long> commentIds;
    private LocalDateTime dateCreated;
    private String body;
    private Long mediaId;
    private double rating;
    private int upVotes;
    private int downVotes;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static ReviewEntityDTO convertReviewEntityToDTO(ReviewEntity reviewEntity, String username, String picture) {

        return new ReviewEntityDTO(
                reviewEntity.getId(),
                reviewEntity.getUserId(),
                username,
                picture,
                reviewEntity.getCommentIds(),
                reviewEntity.getDateCreated(),
                reviewEntity.getBody(),
                reviewEntity.getMediaId(),
                reviewEntity.getRating(),
                reviewEntity.getUpVotes(),
                reviewEntity.getDownVotes(),
                reviewEntity.getStartDate(),
                reviewEntity.getEndDate()
        );
    }

    @Override
    public int compareTo(ReviewEntityDTO other) {
        return this.dateCreated.compareTo(other.dateCreated);
    }

    @Override
    public String toString() {
        return "ReviewEntityDTO{" +
                "id=" + id +
                ", userId=" + userId +
                ", username='" + username + '\'' +
                ", commentIds=" + commentIds +
                ", dateCreated=" + dateCreated +
                ", body='" + body + '\'' +
                ", mediaId=" + mediaId +
                ", rating=" + rating +
                ", upVotes=" + upVotes +
                ", downVotes=" + downVotes +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}

package com.content.monkey.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @NotNull
    @Column(name = "comments")
    private List<Long> commentIds;

    @NotNull
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @NotNull
//    @NotEmpty
    private String body;

    @NotNull
    @Column(name = "media_id")
    private Long mediaId;

    private double rating;

    @Min(0)
    @Column(name = "up_votes")
    private int upVotes;

    @Min(0)
    @Column(name = "down_votes")
    private int downVotes;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Override
    public String toString() {
        return "ReviewEntity{" +
                "id=" + id +
                ", user=" + userId +
                ", comments=" + commentIds +
                ", dateCreated='" + dateCreated + '\'' +
                ", reviewBody='" + body + '\'' +
                ", reviewSubject=" + mediaId +
                ", rating=" + rating +
                ", upvotes=" + upVotes +
                ", downvotes=" + downVotes +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}

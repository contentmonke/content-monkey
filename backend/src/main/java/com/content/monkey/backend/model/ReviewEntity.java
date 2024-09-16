package com.content.monkey.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "reviews")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @NotNull
    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY)
    private List<CommentEntity> comments;

    @NotNull
    @NotEmpty
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @NotNull
    @NotEmpty
    private String body;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "media_id")
    private MediaEntity media;

    private double rating;

    @Column(name = "up_votes")
    private int upVotes;

    @Column(name = "down_votes")
    private int downVotes;

    @NotNull
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @NotNull
    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Override
    public String toString() {
        return "ReviewEntity{" +
                "id=" + id +
//                ", user=" + user.getName() +
//                ", comments=" + comments +
                ", dateCreated='" + dateCreated + '\'' +
                ", reviewBody='" + body + '\'' +
                ", reviewSubject=" + media +
                ", rating=" + rating +
                ", upvotes=" + upVotes +
                ", downvotes=" + downVotes +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}

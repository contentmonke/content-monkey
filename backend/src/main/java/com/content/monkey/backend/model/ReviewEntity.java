package com.content.monkey.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "reviews")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "id")
    private List<CommentEntity> comments;

    @Column(name = "date_created")
    private String dateCreated;

    private String body;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private MediaEntity subject;

    private double rating;

    @Column(name = "up_votes")
    private int upVotes;

    @Column(name = "down_votes")
    private int downVotes;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Override
    public String toString() {
        return "ReviewEntity{" +
                "id=" + id +
//                ", user=" + user.getName() +
//                ", comments=" + comments +
                ", dateCreated='" + dateCreated + '\'' +
                ", reviewBody='" + body + '\'' +
                ", reviewSubject=" + subject +
                ", rating=" + rating +
                ", upvotes=" + upVotes +
                ", downvotes=" + downVotes +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}

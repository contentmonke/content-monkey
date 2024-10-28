package com.content.monkey.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "review_id")
    private Long reviewId;

    @NotNull
    @NotEmpty
    private String body;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Column(name = "reply_ids")
    private List<Long> replyIds;

    @Column(name = "up_votes")
    private int upVotes;

    @Column(name = "down_votes")
    private int downVotes;


    @Override
    public String toString() {
        return "CommentEntity{" +
                "id=" + id +
                ", userId=" + userId +
                ", body='" + body + '\'' +
                ", dateCreated=" + dateCreated +
                ", replyIds=" + replyIds +
                ", upVotes=" + upVotes +
                ", downVotes=" + downVotes +
                '}';
    }
}

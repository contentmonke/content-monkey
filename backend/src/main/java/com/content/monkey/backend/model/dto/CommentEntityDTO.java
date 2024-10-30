package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.CommentEntity;
import com.content.monkey.backend.model.ReviewEntity;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntityDTO {
    private Long id;
    private Long userId;
    private String username;
    private Long reviewId;
    private String body;
    private LocalDateTime dateCreated;
    private List<Long> replyIds;
    private int upVotes;
    private int downVotes;

    public static CommentEntityDTO convertCommentEntityToDTO(CommentEntity commentEntity, String username) {

        return new CommentEntityDTO(
                commentEntity.getId(),
                commentEntity.getUserId(),
                username,
                commentEntity.getReviewId(),
                commentEntity.getBody(),
                commentEntity.getDateCreated(),
                commentEntity.getReplyIds(),
                commentEntity.getUpVotes(),
                commentEntity.getDownVotes()
        );
    }

    @Override
    public String toString() {
        return "CommentEntityDTO{" +
                "id=" + id +
                ", userId=" + userId +
                ", userName='" + username + '\'' +
                ", reviewId=" + reviewId +
                ", body='" + body + '\'' +
                ", dateCreated=" + dateCreated +
                ", replyIds=" + replyIds +
                ", upVotes=" + upVotes +
                ", downVotes=" + downVotes +
                '}';
    }
}

package com.content.monkey.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
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
@Table(name = "post")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "username")
    private String username;

    @NotNull
    @Column(name = "comment_ids")
    private List<Long> commentIds;

    @NotNull
    @Column(name = "post_date")
    private LocalDateTime postDate;

    @NotNull
    @Column(name = "post_body")
    private String postBody;

    @Min(0)
    @Column(name = "up_votes")
    private int upVotes;

    @Min(0)
    @Column(name = "down_votes")
    private int downVotes;

    @Column(name = "picture")
    private String picture;

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull String getUsername() {
        return username;
    }

    public void setUsername(@NotNull String username) {
        this.username = username;
    }

    public @NotNull List<Long> getCommentIds() {
        return commentIds;
    }

    public void setCommentIds(@NotNull List<Long> commentIds) {
        this.commentIds = commentIds;
    }

    public @NotNull LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(@NotNull LocalDateTime postDate) {
        this.postDate = postDate;
    }

    public @NotNull String getPostBody() {
        return postBody;
    }

    public void setPostBody(@NotNull String postBody) {
        this.postBody = postBody;
    }

    @Min(0)
    public int getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(@Min(0) int upVotes) {
        this.upVotes = upVotes;
    }

    @Min(0)
    public int getDownVotes() {
        return downVotes;
    }

    public void setDownVotes(@Min(0) int downVotes) {
        this.downVotes = downVotes;
    }
}

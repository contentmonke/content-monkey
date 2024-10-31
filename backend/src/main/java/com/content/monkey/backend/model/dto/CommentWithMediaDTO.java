package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.CommentEntity;

import java.time.LocalDateTime;

public class CommentWithMediaDTO {
    private Long id;
    private String body;
    private LocalDateTime dateCreated;
    private Long reviewId;
    private String mediaTitle;  // Field for the media title

    public CommentWithMediaDTO(CommentEntity comment, String mediaTitle) {
        this.id = comment.getId();
        this.body = comment.getBody();
        this.dateCreated = comment.getDateCreated();
        this.reviewId = comment.getReviewId();
        this.mediaTitle = mediaTitle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getMediaTitle() {
        return mediaTitle;
    }

    public void setMediaTitle(String mediaTitle) {
        this.mediaTitle = mediaTitle;
    }
}
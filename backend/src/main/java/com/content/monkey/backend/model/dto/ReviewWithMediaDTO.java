package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.ReviewEntity;

import java.time.LocalDateTime;
import java.util.List;

public class ReviewWithMediaDTO {
    private Long id;
    private Long userId;
    private LocalDateTime dateCreated;
    private String body;
    private Long mediaId;
    private double rating;
    private int upVotes;
    private int downVotes;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String mediaTitle;  // Field for the media title

    public ReviewWithMediaDTO(ReviewEntity review, String mediaTitle) {
        this.id = review.getId();
        this.userId = review.getUserId();
        this.dateCreated = review.getDateCreated();
        this.body = review.getBody();
        this.mediaId = review.getMediaId();
        this.rating = review.getRating();
        this.upVotes = review.getUpVotes();
        this.downVotes = review.getDownVotes();
        this.startDate = review.getStartDate();
        this.endDate = review.getEndDate();
        this.mediaTitle = mediaTitle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getMediaId() {
        return mediaId;
    }

    public void setMediaId(Long mediaId) {
        this.mediaId = mediaId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(int upVotes) {
        this.upVotes = upVotes;
    }

    public int getDownVotes() {
        return downVotes;
    }

    public void setDownVotes(int downVotes) {
        this.downVotes = downVotes;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getMediaTitle() {
        return mediaTitle;
    }

    public void setMediaTitle(String mediaTitle) {
        this.mediaTitle = mediaTitle;
    }
}
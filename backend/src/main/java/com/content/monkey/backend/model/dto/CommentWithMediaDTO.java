package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.CommentEntity;

public class CommentWithMediaDTO {
    private Long id;
    private String body;
    private LocalDateTime dateCreated;
    private Long mediaId;
    private String mediaTitle;  // Field for the media title

    // Constructor to set fields
    public CommentWithMediaDTO(CommentEntity comment, String mediaTitle) {
        this.id = comment.getId();
        this.body = comment.getBody();
        this.dateCreated = comment.getDateCreated();
        this.mediaId = comment.getMediaId();
        this.mediaTitle = mediaTitle;
    }

    // Getters and Setters
    // ...
}
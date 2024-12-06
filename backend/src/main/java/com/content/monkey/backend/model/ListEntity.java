package com.content.monkey.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "lists")
public class ListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "picture")
    private String picture = ""; // Default empty string

    @Column(name = "description")
    private String description = ""; // Default empty string

    @ElementCollection
    @CollectionTable(name = "list_media", joinColumns = @JoinColumn(name = "list_id"))
    @Column(name = "media_id")
    private List<Long> mediaIds = new ArrayList<>(); // Default empty list

    @Column(name = "up_votes", nullable = false, columnDefinition = "int default 0")
    private int upVotes = 0;

    @Column(name = "down_votes", nullable = false, columnDefinition = "int default 0")
    private int downVotes = 0;

    @Column(name = "date_created", nullable = false, updatable = false)
    private LocalDateTime dateCreated = LocalDateTime.now();

    @Column(name = "date_modified")
    private LocalDateTime dateModified = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        dateModified = LocalDateTime.now();
    }

}
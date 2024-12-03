package com.content.monkey.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;


import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "discussion_boards")
public class DiscussionBoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "posts")
    private List<Long> post_ids;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Long> getPost_ids() {
        return post_ids;
    }

    public void setPost_ids(List<Long> post_ids) {
        this.post_ids = post_ids;
    }
}

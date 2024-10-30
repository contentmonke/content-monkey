package com.content.monkey.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.User;

import java.util.List;

@Setter
@Getter
@Entity
@Builder
//@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(name = "review_ids")
    private List<Long> reviewIds;

    @Column(name = "biography")
    private String bio;

    public void setBiography(String biography) {
        this.bio = biography;
    }

    @Column(name = "favorite_genres")
    private String genres;

    @Column(name = "email")
    private String email;

    @Column(name = "picture")
    private String picture;

    @Column(name = "posts_liked_by_user")
    private List<Long> posts_liked;

    @Column(name = "friend_requests")
    private List<String> friend_requests;

    @Column(name = "friend_list")
    private List<String> friend_list;

    @Column(name = "comments_liked_by_user")
    private List<Long> comments_liked;

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getGenres() {
        return this.genres;
    }

    public String getEmail() {
        return this.email;
    }


    //TODO - Add fields
    public UserEntity() {
    }

    public UserEntity(String name, List<Long> reviewIds) {
        this.name = name;
        this.reviewIds = reviewIds;
    }



    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", reviewIds=" + reviewIds +
                '}';
    }
}
package com.content.monkey.backend.model;

import com.content.monkey.backend.exceptions.UserAlreadyBlocked;
import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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

    @Column(name = "username")
    private String username;

    @Column(name = "picture")
    private String picture;

    @Column(name = "posts_liked_by_user")
    private List<Long> posts_liked;

    @Column(name = "posts_disliked_by_user")
    private List<Long> posts_disliked;

    @Column(name = "friend_requests")
    private List<String> friend_requests;

    @Column(name = "friend_list")
    private List<String> friend_list;

    @Column(name = "comments_liked_by_user")
    private List<Long> comments_liked;

    @Column(name = "blocked_users")
    private List<Long> blocked_users;

    @Column(name = "group_list")
    private List<Long> groupList;

    @Column(name = "group_invites")
    private List<Long> groupInvites;

    public List<String> getFriendList() {
        return friend_list;
    }

    @Column(name = "favorite_media")
    private List<Long> favorite_media;

//    @Column(name="media_recs")
    private String[] mediaRecs;

    public List<Long> getFavoriteMedia() {
        return favorite_media;
    }

    public void setFavoriteMedia(List<Long> new_favorite) {
        this.favorite_media = new_favorite;
    }

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

    public String getName() {
        return this.name;
    }

    public Long getId() {
        return this.id;
    }



    public List<Long> setBlockedUsers(Long id) throws UserAlreadyBlocked {
        if (blocked_users.contains(id)) {
            System.out.println("Not adding bc of duplicate");
            throw new UserAlreadyBlocked("User already blocked");
        }
        this.blocked_users.add(id);
        this.friend_list.remove(id.toString());
        return blocked_users;
    }

    public List<Long> updateBlockedUsers(List<Long> id) throws UserAlreadyBlocked {
        this.blocked_users = id;
        return this.blocked_users;
    }

    public List<Long> getBlockedUsers() {
        if (this.blocked_users == null) {
            return new ArrayList<>();
        }
        return this.blocked_users;
    }

    public List<Long> getGroupList() {
        if (this.groupList == null) {
            this.groupList = new ArrayList<>();
            // return new ArrayList<>();
        }
        this.groupList.removeAll(Collections.singletonList(null));
        return this.groupList;
    }

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
                ", bio='" + bio + '\'' +
                ", genres='" + genres + '\'' +
                ", email='" + email + '\'' +
                ", picture='" + picture + '\'' +
                ", posts_liked=" + posts_liked +
                ", posts_disliked=" + posts_disliked +
                ", friend_requests=" + friend_requests +
                ", friend_list=" + friend_list +
                ", comments_liked=" + comments_liked +
                ", blocked_users=" + blocked_users +
                ", group_list=" + groupList +
                ", favorite_media=" + favorite_media +
                '}';
    }
}
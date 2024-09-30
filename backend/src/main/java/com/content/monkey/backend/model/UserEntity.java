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
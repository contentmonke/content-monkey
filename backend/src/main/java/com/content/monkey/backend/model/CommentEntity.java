package com.content.monkey.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;

    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "id")
    private UserEntity user;

    @Override
    public String toString() {
        return "CommentEntity{" + "id=" + id +'}';
    }
}

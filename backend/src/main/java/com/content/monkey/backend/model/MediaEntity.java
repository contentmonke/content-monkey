package com.content.monkey.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "media")
public class MediaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //TODO - Add fields

    @Override
    public String toString() {
        return "MediaEntity{" + "id=" + id + '}';
    }
}

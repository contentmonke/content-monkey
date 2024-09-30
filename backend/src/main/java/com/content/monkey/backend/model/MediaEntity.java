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

    @Column(name = "media_title")
    private String mediaTitle;
    //TODO - Add fields

    @Column(name = "media_duration")
    private int mediaDuration;


    public String getMediaTitle() {
        return mediaTitle;
    }

    public void setMediaTitle(String mediaTitle) {
        this.mediaTitle = mediaTitle;
    }

    public int getMediaDuration() {
        return mediaDuration;
    }

    public void setMediaDuration(int duration) {
        this.mediaDuration = duration;
    }

    @Override
    public String toString() {
        return "MediaEntity{" + "id=" + id + '}';
    }
}

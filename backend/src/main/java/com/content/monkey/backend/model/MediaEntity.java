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

    @Column(name = "media_author")
    private String author;

    @Column(name = "media_genre")
    private String genre;

    @Column(name = "media_description")
    private String description;

    @Column(name = "average_rating")
    private float averageRating;

    @Column(name = "total_ratings")
    private int totalRatings;

    @Column(name = "media_thumbnail")
    private String thumbnail;

    @Column(name = "media_type")
    private String mediaType;


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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(float averageRating) {
        this.averageRating = averageRating;
    }

    public int getTotalRatings() {
        return totalRatings;
    }

    public void setTotalRatings(int totalRatings) {
        this.totalRatings = totalRatings;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    @Override
    public String toString() {
        return "MediaEntity{" + "id=" + id + '}';
    }
}

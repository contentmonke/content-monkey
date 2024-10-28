package com.content.monkey.backend.model.VideoGameModels;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VideoGameItem {
    @JsonProperty("name")
    private String title;

    @JsonProperty("original_release_date")
    private String releaseDate;

    @JsonProperty("deck")
    private String overview;

    @JsonProperty("image")
    private GameImages posterPath;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public GameImages getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(GameImages posterPath) {
        this.posterPath = posterPath;
    }
}

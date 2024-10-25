package com.content.monkey.backend.model.VideoGameModels;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GameImages {
    @JsonProperty("icon_url")
    private String iconUrl;
    @JsonProperty("medium_url")
    private String mediumUrl;
    @JsonProperty("screen_url")
    private String screenUrl;
    @JsonProperty("screen_large_url")
    private String screenLargeUrl;
    @JsonProperty("small_url")
    private String smallUrl;
    @JsonProperty("super_url")
    private String superUrl;
    @JsonProperty("thumb_url")
    private String thumbUrl;
    @JsonProperty("tiny_url")
    private String tinyUrl;
    @JsonProperty("original_url")
    private String originalUrl;

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getMediumUrl() {
        return mediumUrl;
    }

    public void setMediumUrl(String mediumUrl) {
        this.mediumUrl = mediumUrl;
    }

    public String getScreenUrl() {
        return screenUrl;
    }

    public void setScreenUrl(String screenUrl) {
        this.screenUrl = screenUrl;
    }

    public String getScreenLargeUrl() {
        return screenLargeUrl;
    }

    public void setScreenLargeUrl(String screenLargeUrl) {
        this.screenLargeUrl = screenLargeUrl;
    }

    public String getSmallUrl() {
        return smallUrl;
    }

    public void setSmallUrl(String smallUrl) {
        this.smallUrl = smallUrl;
    }

    public String getSuperUrl() {
        return superUrl;
    }

    public void setSuperUrl(String superUrl) {
        this.superUrl = superUrl;
    }

    public String getThumbUrl() {
        return thumbUrl;
    }

    public void setThumbUrl(String thumbUrl) {
        this.thumbUrl = thumbUrl;
    }

    public String getTinyUrl() {
        return tinyUrl;
    }

    public void setTinyUrl(String tinyUrl) {
        this.tinyUrl = tinyUrl;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }
}

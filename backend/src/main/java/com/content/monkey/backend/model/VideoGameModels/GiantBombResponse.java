package com.content.monkey.backend.model.VideoGameModels;

import com.content.monkey.backend.model.TMDB_API_Models.MovieItem;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class GiantBombResponse {
    @JsonProperty("results")
    private List<VideoGameItem> results;

    public List<VideoGameItem> getResults() {
        return results;
    }

    public void setResults(List<VideoGameItem> results) {
        this.results = results;
    }
}

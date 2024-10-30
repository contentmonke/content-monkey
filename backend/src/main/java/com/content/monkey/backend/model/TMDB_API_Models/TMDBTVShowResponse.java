package com.content.monkey.backend.model.TMDB_API_Models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TMDBTVShowResponse {
    @JsonProperty("results")
    private List<TVShowItem> results;

    public List<TVShowItem> getResults() {
        return results;
    }

    public void setResults(List<TVShowItem> results) {
        this.results = results;
    }
}

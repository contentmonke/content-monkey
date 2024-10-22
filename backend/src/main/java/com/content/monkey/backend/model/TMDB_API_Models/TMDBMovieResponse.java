package com.content.monkey.backend.model.TMDB_API_Models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TMDBMovieResponse {
    @JsonProperty("results")
    private List<MovieItem> results;

    public List<MovieItem> getResults() {
        return results;
    }

    public void setResults(List<MovieItem> results) {
        this.results = results;
    }
}

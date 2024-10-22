package com.content.monkey.backend.service;

import com.content.monkey.backend.model.BooksApiModels.GoogleBooksResponse;
import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.model.TMDB_API_Models.TMDBMovieResponse;
import com.content.monkey.backend.model.TMDB_API_Models.TMDBTVShowResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.core.env.Environment;


import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {
    @Autowired
    private RestTemplate template = new RestTemplate();
    @Autowired
    private Environment environment;

    public List<SearchEntity> getSearchResults(String bookTitle) {
        String apiKey = environment.getProperty("CM_GOOGLE_KEY");
        URI uri = UriComponentsBuilder.fromHttpUrl("https://www.goog" +
                        "leapis.com/books/v1/volumes")
                .queryParam("q", bookTitle)
                .queryParam("maxResults", 30)
                .queryParam("key", apiKey)
                .build()
                .toUri();
        GoogleBooksResponse response = template.getForObject(uri, GoogleBooksResponse.class);
        return response.getItems().stream()
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getVolumeInfo().getTitle());
                    entity.setAuthors(item.getVolumeInfo().getAuthors());
                    entity.setPublisher(item.getVolumeInfo().getPublisher());
                    entity.setPublishedDate(item.getVolumeInfo().getPublishedDate());
                    entity.setThumbnail(item.getVolumeInfo().getImageLinks().getThumbnail());
                    entity.setPageCount(item.getVolumeInfo().getPageCount());
                    entity.setDescription(item.getVolumeInfo().getDescription());
                    return entity;
                })
                .collect(Collectors.toList());
    }

    public List<SearchEntity> getMovieSearchResults(String title) {
        String apiKey = environment.getProperty("CM_TMDB_KEY");

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/search/movie")
                .queryParam("query", title)
                .queryParam("api_key", apiKey)
                .build()
                .toUri();

        // Make a GET request to the TMDB API using RestTemplate
        TMDBMovieResponse response = template.getForObject(uri, TMDBMovieResponse.class);

//        // Handle null or empty response

        return response.getResults().stream()
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getTitle());
                    entity.setReleaseDate(item.getReleaseDate());
                    entity.setDescription(item.getOverview());
                    entity.setThumbnail(item.getPosterPath() != null ?
                            "https://image.tmdb.org/t/p/w500" + item.getPosterPath() : null);
                    return entity;
                })
                .collect(Collectors.toList());
    }

    public List<SearchEntity> getTvShowSearchResults(String title) {
        String apiKey = environment.getProperty("CM_TMDB_KEY");

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/search/tv")
                .queryParam("query", title)
                .queryParam("api_key", apiKey)
                .build()
                .toUri();

        // Make a GET request to the TMDB API using RestTemplate
        TMDBTVShowResponse response = template.getForObject(uri, TMDBTVShowResponse.class);

//        // Handle null or empty response

        return response.getResults().stream()
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getTitle());
                    entity.setReleaseDate(item.getReleaseDate());
                    entity.setDescription(item.getOverview());
                    entity.setThumbnail(item.getPosterPath() != null ?
                            "https://image.tmdb.org/t/p/w500" + item.getPosterPath() : null);
                    return entity;
                })
                .collect(Collectors.toList());
    }
}


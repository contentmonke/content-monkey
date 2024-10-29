package com.content.monkey.backend.service;


import com.content.monkey.backend.model.BooksApiModels.GoogleBooksResponse;
import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.model.TMDB_API_Models.TMDBMovieResponse;
import com.content.monkey.backend.model.TMDB_API_Models.TMDBTVShowResponse;
import com.content.monkey.backend.model.VideoGameModels.GiantBombResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.core.env.Environment;

import java.net.URI;
import java.util.ArrayList;
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


        if (response == null || response.getItems() == null) {
            return new ArrayList<SearchEntity>();
        }

        return response.getItems().stream()
                .filter(bookItem ->  bookItem.getVolumeInfo().getImageLinks().getThumbnail() != null)
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getVolumeInfo().getTitle());
                    entity.setAuthors(item.getVolumeInfo().getAuthors());
                    entity.setPublisher(item.getVolumeInfo().getPublisher());
                    entity.setPublishedDate(item.getVolumeInfo().getPublishedDate());
                    entity.setThumbnail(item.getVolumeInfo().getImageLinks().getThumbnail());
                    entity.setPageCount(item.getVolumeInfo().getPageCount());
                    entity.setDescription(item.getVolumeInfo().getDescription());
                    entity.setMediaType("Book");
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

        if (response == null) {
            return new ArrayList<>();
        }

        return response.getResults().stream()
                .filter(movieItem -> movieItem.getPosterPath() != null)
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getTitle());
                    entity.setReleaseDate(item.getReleaseDate());
                    entity.setDescription(item.getOverview());
                    entity.setThumbnail("https://image.tmdb.org/t/p/w500" + item.getPosterPath());
                    entity.setMediaType("Movie");
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

        if (response == null) {
            return new ArrayList<>();
        }

        return response.getResults().stream()
                .filter(tvShowItem -> tvShowItem.getPosterPath() != null)
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getTitle());
                    entity.setReleaseDate(item.getReleaseDate());
                    entity.setDescription(item.getOverview());
                    entity.setThumbnail("https://image.tmdb.org/t/p/w500" + item.getPosterPath());
                    entity.setMediaType("TV Show");
                    return entity;
                })
                .collect(Collectors.toList());
    }

    public List<SearchEntity> getVideoGameSearchResults(String title) {
        String apiKey = environment.getProperty("CM_GIANTBOMB_KEY");

        URI uri = UriComponentsBuilder.fromHttpUrl("https://www.giantbomb.com/api/search")
                .queryParam("query", title)
                .queryParam("api_key", apiKey)
                .queryParam("format", "json")
                .queryParam("resources", "game")
                .build()
                .toUri();

        GiantBombResponse response = template.getForObject(uri, GiantBombResponse.class);

        if (response == null) {
            return new ArrayList<>();
        }

        return response.getResults().stream()
                .filter(videoGameItem -> videoGameItem.getPosterPath() != null)
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getTitle());
                    entity.setReleaseDate(item.getReleaseDate());
                    entity.setDescription(item.getOverview());
                    entity.setThumbnail(item.getPosterPath().getThumbUrl());
                    entity.setMediaType("Video Game");
                    return entity;
                })
                .collect(Collectors.toList());
    }


    public SearchEntity getSearchResultsByTitleAndAuthor(String bookTitle, String author) {
        String apiKey = environment.getProperty("CM_GOOGLE_KEY");
        URI uri = UriComponentsBuilder.fromHttpUrl("https://www.goog" +
                "leapis.com/books/v1/volumes")
                .queryParam("q", bookTitle + "+inauthor:" + author)
                .queryParam("maxResults", 30)
                .queryParam("key", apiKey)
                .build()
                .toUri();
        GoogleBooksResponse response = template.getForObject(uri, GoogleBooksResponse.class);
        if (response.getItems() == null) {
            return null;
        }
        List<SearchEntity> results = response.getItems().stream()
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getVolumeInfo().getTitle());
                    entity.setAuthors(item.getVolumeInfo().getAuthors() == null ? new ArrayList<>()
                            : item.getVolumeInfo().getAuthors());
                    entity.setPublisher(item.getVolumeInfo().getPublisher());
                    entity.setPublishedDate(item.getVolumeInfo().getPublishedDate());
                    entity.setThumbnail(item.getVolumeInfo().getImageLinks().getThumbnail());
                    entity.setPageCount(item.getVolumeInfo().getPageCount());
                    entity.setDescription(item.getVolumeInfo().getDescription());
                    entity.setMediaType("Book");
                    return entity;
                })
                .toList();
        if (results.isEmpty()) {
            return null;
        }
        return results.get(0);
    }
}

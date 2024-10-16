package com.content.monkey.backend.service;

import com.content.monkey.backend.model.GoogleBooksResponse;
import com.content.monkey.backend.model.SearchEntity;
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
        List<SearchEntity> results = response.getItems().stream()
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
                .toList();
        if (results.isEmpty()) {
            return null;
        }
        return results.get(0);
    }
}

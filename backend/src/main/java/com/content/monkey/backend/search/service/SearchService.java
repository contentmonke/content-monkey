package com.content.monkey.backend.search.service;

import com.content.monkey.backend.search.model.GoogleBooksResponse;
import com.content.monkey.backend.search.model.SearchEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {
    @Autowired
    private RestTemplate template = new RestTemplate();

    public List<SearchEntity> getSearchResults(String bookTitle) {
        String apiKey = "AIzaSyCOO87xE2EjAzN2VoAXIX07yEKNSgkixA4";
        URI uri = UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/books/v1/volumes")
                .queryParam("q", bookTitle)
                .queryParam("key", apiKey)
                .build()
                .toUri();
        GoogleBooksResponse response = template.getForObject(uri, GoogleBooksResponse.class);
//        "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCOO87xE2EjAzN2VoAXIX07yEKNSgkixA4"
        return response.getItems().stream()
                .map(item -> {
                    SearchEntity entity = new SearchEntity();
                    entity.setTitle(item.getVolumeInfo().getTitle());
                    entity.setAuthors(item.getVolumeInfo().getAuthors());
                    entity.setPublisher(item.getVolumeInfo().getPublisher());
                    entity.setPublishedDate(item.getVolumeInfo().getPublishedDate());
                    entity.setThumbnail(item.getVolumeInfo().getImageLinks().getThumbnail());
                    entity.setPageCount(item.getVolumeInfo().getPageCount());
                    return entity;
                })
                .collect(Collectors.toList());
//        return response;
    }
}

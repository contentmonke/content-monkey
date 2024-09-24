package com.content.monkey.backend.controller;

import com.content.monkey.backend.example.app.model.ExampleEntity;
import com.content.monkey.backend.example.app.service.ExampleService;
import com.content.monkey.backend.model.GoogleBooksResponse;
import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping
    public List<SearchEntity> getSearchResults(@RequestParam String bookTitle) {

        return searchService.getSearchResults(bookTitle);

    }


}

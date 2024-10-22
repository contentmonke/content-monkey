package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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

    @GetMapping("/movie/{title}")
    public List<SearchEntity> getMovieSearchResults(@PathVariable("title") String title) {
        return searchService.getMovieSearchResults(title);
    }

    @GetMapping("/tv/{title}")
    public List<SearchEntity> getTvShowSearchResults(@PathVariable("title") String title) {
        return searchService.getTvShowSearchResults(title);
    }


}

package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.SearchEntity;
import com.content.monkey.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.text.similarity.LevenshteinDistance;
import java.util.*;

import java.util.ArrayList;
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

    @GetMapping("/videoGame/{title}")
    public List<SearchEntity> getVideoGameSearchResults(@PathVariable("title") String title) {
        return searchService.getVideoGameSearchResults(title);
    }

    @GetMapping("any/{title}")
    public List<SearchEntity> getAnySearchResults(@PathVariable("title") String title) {
        List<SearchEntity> results = new ArrayList<>(searchService.getMovieSearchResults(title));
        results.addAll(searchService.getSearchResults(title));
        results.addAll(searchService.getTvShowSearchResults(title));
        results.addAll(searchService.getVideoGameSearchResults(title));
        LevenshteinDistance levenshtein = new LevenshteinDistance();
        results.sort(Comparator.comparingInt(m -> levenshtein.apply(m.getTitle(), title)));
        return results;
    }


}

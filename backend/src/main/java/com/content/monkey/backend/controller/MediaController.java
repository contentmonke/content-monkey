package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.dto.MediaEntityDTO;
import com.content.monkey.backend.service.MediaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    MediaService mediaService;

    @GetMapping("/{mediaTitle}")
    public MediaEntityDTO getMediaByTitle(
            @PathVariable("mediaTitle") String mediaTitle,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        return mediaService.getMediaByTitle(mediaTitle, pageNumber, pageSize);
    }

    @GetMapping("/id/{mediaID}")
    public MediaEntity getMediaByID(@PathVariable("mediaID") Long mediaID) {
        return mediaService.getMediaByID(mediaID);
    }

    @PostMapping("/")
    public MediaEntityDTO getMediaByTitle(@RequestBody MediaEntity mediaEntity,
                                          @RequestParam(defaultValue = "0") int pageNumber,
                                          @RequestParam(defaultValue = "10") int pageSize) throws JsonProcessingException {
        MediaEntityDTO result = mediaService.getMediaByTitleAndType(mediaEntity.getMediaTitle(), mediaEntity.getMediaType(), pageNumber, pageSize);
        if (result == null) {
            mediaEntity.setTotalRatings(0);
            mediaEntity.setAverageRating(0);
            result = mediaService.createMediaEntity(mediaEntity);
        }
        return result;
    }

    @GetMapping("/streamingServices/{mediaTitle}/{countryCode}")
    public String getStreamingServices(
            @PathVariable("mediaTitle") String mediaTitle,
            @PathVariable("countryCode") String countryCode
    ) throws JsonProcessingException {
        return mediaService.getStreamingServiceByTitle(mediaTitle, countryCode);
    }

    @GetMapping("/{mediaTitle}/author/{author}")
    public MediaEntity getMediaByTitleAndAuthor(
            @PathVariable("mediaTitle") String mediaTitle,
            @PathVariable("author") String author,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        return mediaService.getMediaByTitleAndAuthor(mediaTitle, author, pageNumber, pageSize);
    }

    @PostMapping("/list")
    public List<MediaEntity> getMediaList(@RequestBody List<Long> mediaIds) {
        return mediaService.getMediaList(mediaIds);
    }

}

package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.dto.MediaEntityDTO;
import com.content.monkey.backend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
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
                                          @RequestParam(defaultValue = "10") int pageSize) {
        MediaEntityDTO result = mediaService.getMediaByTitle(mediaEntity.getMediaTitle(), pageNumber, pageSize);
        if (result == null) {
            mediaEntity.setTotalRatings(0);
            mediaEntity.setAverageRating(0);
            result = mediaService.createMediaEntity(mediaEntity);
        }
        return result;
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

package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.MediaEntity;
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
    public MediaEntity getMediaByTitle(@PathVariable("mediaTitle") String mediaTitle) {
        return mediaService.getMediaByTitle(mediaTitle);
    }

    @PostMapping("/")
    public MediaEntity getMediaByTitle(@RequestBody MediaEntity mediaEntity) {
        MediaEntity result = mediaService.getMediaByTitle(mediaEntity.getMediaTitle());
        if (result == null) {
            mediaEntity.setTotalRatings(0);
            mediaEntity.setAverageRating(0);
            result = mediaService.createMediaEntity(mediaEntity);
        }
        return result;
    }

}

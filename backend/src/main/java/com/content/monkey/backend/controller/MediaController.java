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
    public MediaEntity createMediaEntity(@RequestBody MediaEntity mediaEntity) {
        return mediaService.createMediaEntity(mediaEntity);
    }

}

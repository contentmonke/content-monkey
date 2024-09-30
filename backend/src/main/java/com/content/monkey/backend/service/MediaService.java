package com.content.monkey.backend.service;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    public MediaEntity getMediaByTitle(String title) {
        MediaEntity mediaEntity = mediaRepository.findByMediaTitle(title);

        return mediaEntity;
    }

    public MediaEntity createMediaEntity(MediaEntity mediaEntity) {
        return mediaRepository.save(mediaEntity);
    }
}

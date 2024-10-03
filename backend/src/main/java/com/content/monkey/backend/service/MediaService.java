package com.content.monkey.backend.service;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    public MediaEntity getMediaByTitle(String title) {
        List<MediaEntity> mediaEntity = mediaRepository.findByMediaTitle(title);
        if (mediaEntity.isEmpty()) {
            return null;
        }
        return mediaEntity.getFirst();
    }

    public MediaEntity getMediaByID(Long mediaID) {
        List<MediaEntity> mediaEntity = mediaRepository.findByid(mediaID);
        if (mediaEntity.isEmpty()) {
            return null;
        }
        return mediaEntity.getFirst();
    }

    public MediaEntity createMediaEntity(MediaEntity mediaEntity) {
        return mediaRepository.save(mediaEntity);
    }
}

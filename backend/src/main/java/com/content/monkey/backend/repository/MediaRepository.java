package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MediaRepository extends JpaRepository<MediaEntity, Long> {

    List<MediaEntity> findByMediaTitle(String mediaTitle);
    List<MediaEntity> findByMediaTitleAndAuthor(String mediaTitle, String author);

    List<MediaEntity> findByMediaDurationLessThan(int duration);


    List<MediaEntity> findByid(Long id);
}

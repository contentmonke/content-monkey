package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MediaRepository extends JpaRepository<MediaEntity, Long> {

    MediaEntity findByMediaTitle(String mediaTitle);

    List<MediaEntity> findByMediaDurationLessThan(int duration);
}

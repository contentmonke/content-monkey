package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.ReviewEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findAllByMediaId(Long id, PageRequest of);
    List<ReviewEntity> findByMediaIdAndUserId(Long mediaId, Long userId);

    int countByMediaId(Long id);

    List<ReviewEntity> findByid(Long id);

    @Query("SELECT COALESCE(SUM(r.rating), 0) FROM ReviewEntity r WHERE r.mediaId IS NOT NULL AND r.mediaId = :id")
    float getSumRatings(Long id);

    List<ReviewEntity> findByUserId(Long userId);
}

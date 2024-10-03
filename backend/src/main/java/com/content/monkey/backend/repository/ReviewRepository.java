package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.ReviewEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findAllByMediaId(Long id, PageRequest of);

    int countByMediaId(Long id);

    @Query("SELECT SUM(r.rating) FROM ReviewEntity r WHERE r.mediaId = :id")
    float getSumRatings(Long id);
}

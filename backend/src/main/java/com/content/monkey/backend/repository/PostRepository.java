package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.PostEntity;
import com.content.monkey.backend.model.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByid(Long id);

}

package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

}

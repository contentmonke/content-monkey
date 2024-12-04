package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.CommentEntity;
import com.content.monkey.backend.model.DiscussionPostCommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiscussionPostCommentRepository extends JpaRepository<DiscussionPostCommentEntity, Long> {
    @Query("SELECT e FROM CommentEntity e WHERE e.id IN :ids")
    Page<CommentEntity> findAllByIdWithPagination(@Param("ids") List<Long> ids, Pageable pageable);

    List<CommentEntity> findByUsername(String userId);
}

package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionBoardRepository extends JpaRepository<DiscussionBoardEntity, Long> {
    List<DiscussionBoardEntity> findDiscussionBoardById(Long id);


}

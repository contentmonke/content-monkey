package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.GroupEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
    List<GroupEntity> findByid(Long id);
    List<GroupEntity> findByGroupNameContainingIgnoreCase(String groupName);

    @Query("SELECT g FROM GroupEntity g WHERE array_length(g.members) IS NOT NULL " +
            "ORDER BY array_length(g.members) DESC")
    Page<GroupEntity> findPopularGroups(Pageable page);
}

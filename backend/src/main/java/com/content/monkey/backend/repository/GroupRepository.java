package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
    List<GroupEntity> findByid(Long id);
    List<GroupEntity> findByGroupNameContainingIgnoreCase(String groupName);
}

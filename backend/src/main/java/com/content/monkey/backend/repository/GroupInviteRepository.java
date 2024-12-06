package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.GroupInviteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GroupInviteRepository extends JpaRepository<GroupInviteEntity, Long> {
    List<GroupInviteEntity> findByid(Long id);

    List<GroupInviteEntity> findByInviteeIdAndGroupId(Long inviteeId, Long groupId);
}
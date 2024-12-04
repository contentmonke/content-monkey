package com.content.monkey.backend.service;

import com.content.monkey.backend.model.*;
import com.content.monkey.backend.model.dto.groups.GroupInviteDTO;
import com.content.monkey.backend.model.dto.groups.GroupJoinRequest;
import com.content.monkey.backend.repository.GroupInviteRepository;
import com.content.monkey.backend.repository.GroupRepository;
import com.content.monkey.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GroupInviteRepository groupInviteRepository;

    // HELPERS
    public void addGroupToUser(Long userId, Long groupId) {
        try {
            UserEntity user = userService.getUser(userId);
            if (user.getGroupList() == null || user.getGroupList().isEmpty()) {
                user.setGroupList(new ArrayList<>());
            }
            if (user.getGroupList().contains(groupId)) {
                return;
            }
            user.getGroupList().add(groupId);
            System.out.println(user);
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("Error adding groupId to the user entity");
        }
    }

    public void removeGroupFromUser(Long userId, Long groupId) {
        try {
            UserEntity user = userService.getUser(userId);
            if (user.getGroupList() == null) {
                user.setGroupList(new ArrayList<>());
            }
            user.getGroupList().remove(groupId);
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("Error removing groupId from the user entity");
        }
    }

    // SERVICES
    public GroupEntity createGroup(GroupEntity groupEntity) {
        // Initializations
        if (groupEntity.getMembers() == null) {
            groupEntity.setMembers(new ArrayList<>());
        }
        if (!groupEntity.getMembers().contains(groupEntity.getOwner())) {
            groupEntity.getMembers().add(groupEntity.getOwner());
        }
        groupEntity.setDiscussionBoards(new ArrayList<>());
        groupEntity.setJoinRequests(new ArrayList<>());
        System.out.println(groupEntity);

        // Save group
        GroupEntity savedEntity = groupRepository.save(groupEntity);
        addGroupToUser(savedEntity.getOwner(), savedEntity.getId());
        return savedEntity;
    }

    public GroupEntity getGroup(Long groupId) {
        List<GroupEntity> groupEntities = groupRepository.findByid(groupId);
        if (groupEntities.isEmpty()) {
            return null;
        }
        return groupEntities.get(0);
    }

    public GroupEntity joinGroup(Long groupId, Long userId) {
        GroupEntity groupEntity = getGroup(groupId);
        if (groupEntity == null) {
            return null;
        }
        // Repeat request
        if (groupEntity.getJoinRequests().contains(userId) || groupEntity.getMembers().contains(userId)) {
            return null;
        }
        // Public Group
        if (groupEntity.getIsPublic()) {
            groupEntity.getMembers().add(userId);
            GroupEntity savedEntity = groupRepository.save(groupEntity);
            addGroupToUser(userId, groupId);
            return savedEntity;
        }

        // Private Group
        groupEntity.getJoinRequests().add(userId);
        return groupRepository.save(groupEntity);
    }

    public GroupEntity leaveGroup(Long groupId, Long userId) {
        GroupEntity groupEntity = getGroup(groupId);
        if (groupEntity == null) {
            return null;
        }
        groupEntity.getMembers().remove(userId);
        GroupEntity savedEntity = groupRepository.save(groupEntity);
        removeGroupFromUser(userId, groupId);
        return savedEntity;
    }

    public GroupEntity handleRequest(GroupJoinRequest groupJoinRequest) {
        GroupEntity groupEntity = getGroup(groupJoinRequest.getGroupId());
        // Unauthorized Approver
        if (!Objects.equals(groupEntity.getOwner(), groupJoinRequest.getApproverId())) {
            System.out.println("This user is not authorized to handle group requests");
            return null;
        }

        // Approved Request
        if (groupJoinRequest.getIsApproved()) {
            groupEntity.getJoinRequests().remove(groupJoinRequest.getRequesterId());
            GroupEntity savedEntity = null;
            if (!groupEntity.getMembers().contains(groupJoinRequest.getRequesterId())) {
                groupEntity.getMembers().add(groupJoinRequest.getRequesterId());
                savedEntity = groupRepository.save(groupEntity);
            }
            addGroupToUser(groupJoinRequest.getRequesterId(), groupEntity.getId());
            return savedEntity;
        }

        // Denied Request
        groupEntity.getJoinRequests().remove(groupJoinRequest.getRequesterId());
        return groupRepository.save(groupEntity);
    }

    public List<GroupEntity> searchGroups(String searchTerm) {
        return groupRepository.findByGroupNameContainingIgnoreCase(searchTerm);
    }

    public UserEntity invite(GroupInviteEntity groupInvite) {
        UserEntity user = userService.getUser(groupInvite.getInviteeId());
        if (user.getGroupInvites() == null) {
            user.setGroupInvites(new ArrayList<>());
        }
        // Invalid Invitation
        GroupEntity group = getGroup(groupInvite.getGroupId());
        if (!group.getMembers().contains(groupInvite.getInviterId())) {
            System.out.println("Invalid Group Invite: invitation came from someone outside of the group");
            return null;
        }
        // User is already a member
        if (group.getMembers().contains(groupInvite.getInviteeId())) {
            System.out.println("Invited user is already a member of this group");
            return null;
        }
        // Already has an invitation pending from this inviter
        List<GroupInviteEntity> groupInviteEntities  = groupInviteRepository.findAllById(user.getGroupInvites());
        for (GroupInviteEntity groupInviteEntity : groupInviteEntities) {
            if (Objects.equals(groupInviteEntity.getGroupId(), groupInvite.getGroupId()) &&
                    Objects.equals(groupInviteEntity.getInviterId(), groupInvite.getInviterId())) {
                System.out.println("User already has an invitation from this inviter");
                return null;
            }
        }

        GroupInviteEntity inviteEntity = groupInviteRepository.save(groupInvite);
        user.getGroupInvites().add(inviteEntity.getId());
        return userRepository.save(user);
    }

    public UserEntity handleInvite(Long userId, Long groupId, Boolean isAccepted) {
        UserEntity user = userService.getUser(userId);
        if (user.getGroupInvites() == null) {
            user.setGroupInvites(new ArrayList<>());
        }

        // No pending invites for this group
        if (groupInviteRepository.findByInviteeIdAndGroupId(userId, groupId).size() == 0) {
            System.out.println("Not a valid pending invite");
            return null;
        }

        List<GroupInviteEntity> inviteEntities  = groupInviteRepository.findAllById(user.getGroupInvites());

        // Remove the pending invites for this group
        List<Long> toRemove = new ArrayList<>();
        for (GroupInviteEntity invite: inviteEntities) {
            if (Objects.equals(invite.getGroupId(), groupId)) {
                toRemove.add(invite.getId());
            }
        }

        if (isAccepted) {
            // Already a member of the group
            if (user.getGroupList().contains(groupId)) {
                return null;
            }
            GroupEntity groupEntity = getGroup(groupId);
            groupEntity.getMembers().add(userId);
            groupRepository.save(groupEntity);
            user.getGroupList().add(groupId);
        }

        System.out.println("Deleting Invites " + toRemove);
        groupInviteRepository.deleteAllByIdInBatch(toRemove);
        user.getGroupInvites().removeAll(toRemove);
        return userRepository.save(user);
    }

    public List<GroupInviteDTO> getInvites(Long userId) {
        UserEntity user = userService.getUser(userId);
        List<GroupInviteEntity> invites = groupInviteRepository.findAllById(user.getGroupInvites());
        List<GroupInviteDTO> inviteDTOs = new ArrayList<>();

        // Convert invite to DTO
        for (GroupInviteEntity invite: invites) {

            UserEntity inviter = userService.getUser(invite.getInviterId());
            GroupEntity group = getGroup(invite.getGroupId());
            inviteDTOs.add(
                    GroupInviteDTO.builder()
                            .groupId(group.getId())
                            .groupName(group.getGroupName())
                            .inviteeId(userId)
                            .inviterId(inviter.getId())
                            .inviterName(inviter.getName())
                            .dateSent(invite.getDateSent())
                            .build()
            );
        }

        System.out.println(inviteDTOs);
        return inviteDTOs;
    }

    public List<GroupEntity> getMyGroups(Long userId) {
        UserEntity user = userService.getUser(userId);
        return groupRepository.findAllById(user.getGroupList());
    }

    public List<GroupEntity> getPopularGroups() {
        Pageable page = PageRequest.of(0, 30);
        Page<GroupEntity> pageResult = groupRepository.findPopularGroups(page);
        return pageResult.getContent();
    }


}

package com.content.monkey.backend.service;

import com.content.monkey.backend.model.GroupEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.groups.GroupInvite;
import com.content.monkey.backend.model.dto.groups.GroupJoinRequest;
import com.content.monkey.backend.repository.GroupRepository;
import com.content.monkey.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.content.monkey.backend.model.dto.groups.GroupInvite.*;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    // HELPERS
    public void addGroupToUser(Long userId, Long groupId) {
        try {
            UserEntity user = userService.getUser(userId);
            if (user.getGroupList() == null) {
                user.setGroupList(new ArrayList<>());
            }
            if (user.getGroupList().contains(groupId)) {
                return;
            }
            user.getGroupList().add(groupId);
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

    public UserEntity invite(GroupInvite groupInvite) {
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
        // Already has an invitation pending
        List<Map<String, Long>> mappedInvites = jsonToInvitesList(user.getGroupInvites());
        for (Map<String, Long> map : mappedInvites) {
            if (map.containsKey("inviteeId") && map.get("inviteeId").equals(groupInvite.getInviteeId())) {
                System.out.println("User already has an invitation for this group pending");
                return null;
            }
        }

        String inviteJSON = inviteToJSON(groupInvite);
        if (inviteJSON.isEmpty()) {
            return null;
        }
        user.getGroupInvites().add(inviteJSON);
        return userRepository.save(user);
    }

    public UserEntity handleInvite(GroupInvite groupInvite, Boolean isAccepted) {
        UserEntity user = userService.getUser(groupInvite.getInviteeId());
        if (user.getGroupInvites() == null) {
            user.setGroupInvites(new ArrayList<>());
        }
        List<Map<String, Long>> invites = jsonToInvitesList(user.getGroupInvites());
        invites.removeIf(invite -> invite.containsValue(groupInvite.getGroupId()));
        List<String> jsonInvites = new ArrayList<>();
        for (Map<String, Long> map: invites){
            jsonInvites.add(inviteMapToJSON(map));
        }

        user.setGroupInvites(jsonInvites);

        if (isAccepted) {
            GroupEntity groupEntity = getGroup(groupInvite.getGroupId());
            groupEntity.getMembers().add(groupInvite.getInviteeId());
            groupRepository.save(groupEntity);
            user.getGroupList().add(groupInvite.getGroupId());
        }
        return userRepository.save(user);
    }


}

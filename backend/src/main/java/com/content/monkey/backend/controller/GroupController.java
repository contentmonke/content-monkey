package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import com.content.monkey.backend.model.GroupEntity;
import com.content.monkey.backend.model.GroupInviteEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.groups.GroupInviteDTO;
import com.content.monkey.backend.model.dto.groups.GroupJoinRequest;
import com.content.monkey.backend.service.DiscussionBoardService;
import com.content.monkey.backend.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;
    @Autowired
    private DiscussionBoardService discussionBoardService;

    @PostMapping()
    public ResponseEntity<GroupEntity> createGroup(@RequestBody GroupEntity groupEntity) {
        GroupEntity savedEntity = groupService.createGroup(groupEntity);
        if (savedEntity == null) {
            return ResponseEntity.noContent().build();
        }
        URI uri = URI.create("/api/groups/" + savedEntity.getId());
        return ResponseEntity.created(uri).body(savedEntity);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupEntity> getGroup(@PathVariable Long groupId) {
        GroupEntity group = groupService.getGroup(groupId);
        return ResponseEntity.ok().body(group);
    }

    @GetMapping("/{userId}/myGroups")
    public ResponseEntity<List<GroupEntity>> getMyGroups(@PathVariable Long userId) {
        List<GroupEntity> myGroups = groupService.getMyGroups(userId);
        return ResponseEntity.ok().body(myGroups);
    }

    @GetMapping("/popularGroups")
    public ResponseEntity<List<GroupEntity>> getPopularGroups() {
        List<GroupEntity> popularGroups = groupService.getPopularGroups();
        return ResponseEntity.ok().body(popularGroups);
    }

    @PostMapping("/join/{groupId}/{userId}")
    public ResponseEntity<GroupEntity> joinGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        GroupEntity groupEntity = groupService.joinGroup(groupId, userId);
        if (groupEntity == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();

    }

    @PostMapping("/leave/{groupId}/{userId}")
    public ResponseEntity<GroupEntity> leaveGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        GroupEntity groupEntity = groupService.leaveGroup(groupId, userId);
        if (groupEntity == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();

    }

    @PostMapping("/request")
    public ResponseEntity<GroupEntity> handleRequest(@RequestBody GroupJoinRequest groupJoinRequest) {
        GroupEntity groupEntity = groupService.handleRequest(groupJoinRequest);
        if (groupEntity == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search/{searchTerm}")
    public ResponseEntity<List<GroupEntity>> searchGroups(@PathVariable String searchTerm) {
        List<GroupEntity> groupEntities = groupService.searchGroups(searchTerm);
        return ResponseEntity.ok().body(groupEntities);
    }

    @PostMapping("/invite")
    public ResponseEntity<UserEntity> invite(@RequestBody GroupInviteEntity groupInvite) {
        System.out.println(groupInvite);
        UserEntity updatedUser = groupService.invite(groupInvite);
        if (updatedUser == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("/invite/{userId}/{groupId}/{isAccepted}")
    public ResponseEntity<UserEntity> handleInvite(@PathVariable Long userId, @PathVariable Long groupId,@PathVariable Boolean isAccepted) {
        UserEntity updatedUser = groupService.handleInvite(userId, groupId, isAccepted);
        if (updatedUser == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/invite/{userId}")
    public ResponseEntity<List<GroupInviteDTO>> getInvites(@PathVariable Long userId) {
        List<GroupInviteDTO> invites = groupService.getInvites(userId);
        return ResponseEntity.ok().body(invites);
    }

    @GetMapping("/discussionBoards/{groupId}")
    public List<DiscussionBoardEntity> getDiscussionBoards(@PathVariable Long groupId) {
        return discussionBoardService.getGroupDiscussionBoards(groupId);
    }



}

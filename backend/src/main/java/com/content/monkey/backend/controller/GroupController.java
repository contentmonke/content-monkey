package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.GroupEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.groups.GroupInvite;
import com.content.monkey.backend.model.dto.groups.GroupJoinRequest;
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
    public ResponseEntity<UserEntity> invite(@RequestBody GroupInvite groupInvite) {
        System.out.println(groupInvite);
        UserEntity updatedUser = groupService.invite(groupInvite);
        if (updatedUser == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("/invite/{isAccepted}")
    public ResponseEntity<UserEntity> invite(@RequestBody GroupInvite groupInvite, @PathVariable Boolean isAccepted) {
        UserEntity updatedUser = groupService.handleInvite(groupInvite, isAccepted);
        if (updatedUser == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().build();
    }


}

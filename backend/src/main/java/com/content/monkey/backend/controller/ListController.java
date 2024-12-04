package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.service.UserService;
import com.content.monkey.backend.service.ListService;
import com.content.monkey.backend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lists")
public class ListController {

    private final ListService listService;

    @Autowired
    private MediaService mediaService;


    @Autowired
    private UserService userService;

    public ListController(ListService listService) {
        this.listService = listService;
    }

    @GetMapping
    public ResponseEntity<List<ListEntity>> getAllLists() {
        return ResponseEntity.ok(listService.getAllLists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListEntity> getListById(@PathVariable Long id) {
        return ResponseEntity.ok(listService.getListById(id));
    }

    @GetMapping("/{listId}/details")
    public ResponseEntity<List<MediaEntity>> getListDetails(@PathVariable Long listId) {
        ListEntity list = listService.getListById(listId);

        // Fetch media details for each mediaId
        List<MediaEntity> mediaDetails = list.getMediaIds().stream()
                .map(mediaService::getMediaDetailsById) // A method to fetch media details
                .toList();

        // Return the list with additional media details
        return ResponseEntity.ok(mediaDetails);
    }

    @PostMapping("/create")
    public ResponseEntity<UserEntity> createList(@RequestParam String name, @RequestParam Long userId) {
        ListEntity createdList = listService.createList(name, userId);
        UserEntity updatedUser = userService.addListToUser(userId, createdList.getId());
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListEntity> updateList(@PathVariable Long id, @RequestBody ListEntity listEntity) {
        ListEntity updatedList = listService.updateList(id, listEntity);
        return ResponseEntity.ok(updatedList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        listService.deleteList(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{listId}/upvote")
    public ResponseEntity<Void> upvoteList(@PathVariable Long listId, @RequestParam Long userId) {
        listService.upvoteList(listId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{listId}/downvote")
    public ResponseEntity<Void> downvoteList(@PathVariable Long listId, @RequestParam Long userId) {
        listService.downvoteList(listId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{listId}/add-media")
    public ResponseEntity<ListEntity> addMediaToList(@PathVariable Long listId, @RequestParam Long mediaId) {
        if (mediaId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        ListEntity updatedList = listService.addMediaToList(listId, mediaId);
        return ResponseEntity.ok(updatedList);
    }

    @DeleteMapping("/{listId}/remove-media")
    public ResponseEntity<ListEntity> removeMediaFromList(@PathVariable Long listId, @RequestParam Long mediaId) {
        ListEntity updatedList = listService.removeMediaFromList(listId, mediaId);
        return ResponseEntity.ok(updatedList);
    }
}
package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.service.UserService;
import com.content.monkey.backend.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class ListController {

    private final ListService listService;


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

    @PostMapping("/create")
    public ResponseEntity<UserEntity> createList(@RequestParam String name, @RequestParam Long userId) {
        ListEntity createdList = listService.createList(name, userId);
        UserEntity updatedUser = userService.addListToUser(userId, createdList.getId());
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListEntity> updateList(@PathVariable Long id, @RequestBody ListEntity listEntity) {
        return ResponseEntity.ok(listService.updateList(id, listEntity));
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
}
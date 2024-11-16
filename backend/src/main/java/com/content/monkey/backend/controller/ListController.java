package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.ListEntity;
import com.content.monkey.backend.service.ListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class ListController {

    private final ListService listService;

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
    public ResponseEntity<ListEntity> createList(@RequestParam String name, @RequestParam Long userId) {
        ListEntity createdList = listService.createList(name, userId);
        return ResponseEntity.ok(createdList);
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
}
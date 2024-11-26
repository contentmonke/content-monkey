package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import com.content.monkey.backend.service.DiscussionBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/discussionBoard")
public class DiscussionBoardController {

    @Autowired
    DiscussionBoardService discussionBoardService;

    @GetMapping("/get/{id}")
    public DiscussionBoardEntity getDiscussionBoardById(@PathVariable("id") int id) {
        return discussionBoardService.getDiscussionBoardById(id);
    }

    @PostMapping("/create/{title}")
    public DiscussionBoardEntity createDiscussionBoard(@PathVariable("title") String title) {
        return discussionBoardService.createDiscussionBoard(title);
    }

}

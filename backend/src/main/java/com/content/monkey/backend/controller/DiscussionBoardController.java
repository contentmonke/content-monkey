package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import com.content.monkey.backend.model.GroupEntity;
import com.content.monkey.backend.model.PostEntity;
import com.content.monkey.backend.service.DiscussionBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussionBoard")
public class DiscussionBoardController {

    @Autowired
    DiscussionBoardService discussionBoardService;

    @GetMapping("/get/{id}")
    public DiscussionBoardEntity getDiscussionBoardById(@PathVariable("id") Long id) {
        return discussionBoardService.getDiscussionBoardById(id);
    }

    @PostMapping("/create/{title}/{groupId}")
    public GroupEntity createDiscussionBoard(@PathVariable("title") String title, @PathVariable("groupId") Long groupId) {
        return discussionBoardService.createDiscussionBoard(title, groupId);
    }

    @PostMapping("/createPost/{discussionBoardId}/{postBody}/{username}")
    public List<PostEntity> createDiscussionPost(@PathVariable("discussionBoardId") Long boardId, @PathVariable("postBody") String postBody,
                                                      @PathVariable("username") String username) {
        discussionBoardService.addPostToDiscussionBoard(boardId, postBody, username);
        return discussionBoardService.getDiscussionPosts(boardId);
    }

    @GetMapping("/getDiscussionPosts/{discussionBoardId}")
    public List<PostEntity> getDiscussionPosts(@PathVariable("discussionBoardId") Long boardId) {
        return discussionBoardService.getDiscussionPosts(boardId);
    }

}

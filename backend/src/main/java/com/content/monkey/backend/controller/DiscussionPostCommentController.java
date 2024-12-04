package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.DiscussionPostCommentEntity;
import com.content.monkey.backend.model.dto.CommentEntityDTO;
import com.content.monkey.backend.repository.PostRepository;
import com.content.monkey.backend.service.DiscussionBoardService;
import com.content.monkey.backend.service.DiscussionPostCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussionPostComments")
public class DiscussionPostCommentController {
    @Autowired
    private DiscussionPostCommentService discussionPostCommentService;

    @Autowired
    private DiscussionBoardService discussionBoardService;

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/{userId}/{body}/{postId}")
    public List<DiscussionPostCommentEntity> createComment(@PathVariable("userId") String userId, @PathVariable("body") String body, @PathVariable("postId") Long postId ) {
        discussionPostCommentService.createComment(userId, body, postId);
        return discussionPostCommentService.getComments(postRepository.findByid(postId).get(0).getCommentIds());
    }

    @PostMapping("/getComments")
    public List<DiscussionPostCommentEntity> getComments(@RequestBody List<Long> commentIds) {
        return discussionPostCommentService.getComments(commentIds);
    }

}

package com.content.monkey.backend.controller;

import com.content.monkey.backend.model.CommentEntity;
import com.content.monkey.backend.model.dto.CommentEntityDTO;
import com.content.monkey.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping()
    public ResponseEntity<CommentEntity> createComment(@RequestBody CommentEntity commentEntity) {
        CommentEntity savedComment = commentService.createComment(commentEntity);
        if (savedComment == null) {
            return ResponseEntity.noContent().build();
        }
        URI uri = URI.create("/api/comments/" + savedComment.getId());
        return ResponseEntity.created(uri).body(savedComment);
    }

    @PostMapping("/getComments")
    public ResponseEntity<List<CommentEntityDTO>> getComments(@RequestBody List<Long> commentIds) {
        List<CommentEntityDTO> commentEntities = commentService.getComments(commentIds);
        return ResponseEntity.ok().body(commentEntities);
    }

}

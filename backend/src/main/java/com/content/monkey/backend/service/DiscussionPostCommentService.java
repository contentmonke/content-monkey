package com.content.monkey.backend.service;

import com.content.monkey.backend.model.*;
import com.content.monkey.backend.model.dto.CommentEntityDTO;
import com.content.monkey.backend.repository.DiscussionPostCommentRepository;
import com.content.monkey.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.content.monkey.backend.model.dto.CommentEntityDTO.convertCommentEntityToDTO;

@Service
public class DiscussionPostCommentService {
    @Autowired
    private DiscussionPostCommentRepository discussionPostCommentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    private void addCommentToPost(Long postId, Long commentId) {
        List<PostEntity> postEntities = postRepository.findByid(postId);
        if (postEntities.size() == 0) {
            return;
        }
        PostEntity postEntity = postEntities.get(0);
        if (postEntity.getCommentIds() == null) {
            postEntity.setCommentIds(new ArrayList<>());
        }
        postEntity.getCommentIds().add(commentId);
        postRepository.save(postEntity);
    }

    public DiscussionPostCommentEntity createComment(String userId, String body, Long postId) {
        DiscussionPostCommentEntity newComment = new DiscussionPostCommentEntity();
        UserEntity user = userService.getUserByUsernameSearch(userId).get(0);
        LocalDateTime currentDateTime = LocalDateTime.now();
        newComment.setBody(body);
        newComment.setPostId(postId);
        newComment.setDateCreated(currentDateTime);
        newComment.setUsername(userId);
        newComment.setPicture(user.getPicture());
        newComment = discussionPostCommentRepository.save(newComment);
        addCommentToPost(newComment.getPostId(), newComment.getId());
        return newComment;
    }

    public List<DiscussionPostCommentEntity> getComments(List<Long> commentIds) {
        List<DiscussionPostCommentEntity> comments = discussionPostCommentRepository.findAllById(commentIds);
        return comments;
    }

}

package com.content.monkey.backend.service;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import com.content.monkey.backend.model.PostEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.DiscussionBoardRepository;
import com.content.monkey.backend.repository.PostRepository;
import com.google.api.client.util.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DiscussionBoardService {

    @Autowired
    private DiscussionBoardRepository discussionBoardRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public DiscussionBoardEntity getDiscussionBoardById(int id) {
        List<DiscussionBoardEntity> discussionBoardEntities = discussionBoardRepository.findDiscussionBoardById(id);
        if (discussionBoardEntities == null || discussionBoardEntities.isEmpty()) {
            return null;
        }
        return discussionBoardEntities.getFirst();
    }

    public DiscussionBoardEntity createDiscussionBoard(String title) {
        DiscussionBoardEntity newBoard = new DiscussionBoardEntity();
        newBoard.setTitle(title);
        newBoard.setPost_ids(new ArrayList<Long>());
        newBoard = discussionBoardRepository.save(newBoard);
        return discussionBoardRepository.save(newBoard);
    }

    public DiscussionBoardEntity addPostToDiscussionBoard(int boardId, String postBody, String username) {
        DiscussionBoardEntity board = getDiscussionBoardById(boardId);
        if (board.getPost_ids() == null) {
            board.setPost_ids(new ArrayList<>());
        }
        try {
            UserEntity user = userService.getUserByUsernameSearch(username).get(0);
            PostEntity newPost = new PostEntity();
            LocalDateTime currentDateTime = LocalDateTime.now();
            newPost.setPostBody(postBody);
            newPost.setPostDate(currentDateTime);
            newPost.setUsername(username);
            newPost.setPicture(user.getPicture());
            newPost.setCommentIds(new ArrayList<>());
            newPost = postRepository.save(newPost);
            board.getPost_ids().add(newPost.getId());
            return discussionBoardRepository.save(board);
        } catch(Exception e) {
            System.out.println("User " + username + " is not found, skip");
        }            
        return null;
    }

    public List<PostEntity> getDiscussionPosts(int boardId) {
        DiscussionBoardEntity board = getDiscussionBoardById(boardId);
        List<PostEntity> discussionPosts = new ArrayList<>();
        List<Long> postIds = board.getPost_ids();
        for(long post: postIds) {
            discussionPosts.add(postRepository.findByid(post).getFirst());
        }
        return discussionPosts;

    }
}

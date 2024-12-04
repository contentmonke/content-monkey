package com.content.monkey.backend.service;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import com.content.monkey.backend.model.GroupEntity;
import com.content.monkey.backend.model.PostEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.repository.DiscussionBoardRepository;
import com.content.monkey.backend.repository.GroupRepository;
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

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepository groupRepository;

    public DiscussionBoardEntity getDiscussionBoardById(Long id) {
        List<DiscussionBoardEntity> discussionBoardEntities = discussionBoardRepository.findDiscussionBoardById(id);
        if (discussionBoardEntities == null || discussionBoardEntities.isEmpty()) {
            return null;
        }
        return discussionBoardEntities.get(0);
    }

    public GroupEntity createDiscussionBoard(String title, Long groupId) {
        DiscussionBoardEntity newBoard = new DiscussionBoardEntity();
        newBoard.setTitle(title);
        newBoard.setPost_ids(new ArrayList<Long>());
        newBoard = discussionBoardRepository.save(newBoard);
        GroupEntity group = groupService.getGroup(groupId);
        group.getDiscussionBoards().add(newBoard.getId());
        discussionBoardRepository.save(newBoard);
        return groupRepository.save(group);

    }

    public DiscussionBoardEntity addPostToDiscussionBoard(Long boardId, String postBody, String username) {
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

    public List<PostEntity> getDiscussionPosts(Long boardId) {
        DiscussionBoardEntity board = getDiscussionBoardById(boardId);
        List<PostEntity> discussionPosts = new ArrayList<>();
        List<Long> postIds = board.getPost_ids();
        for(long post: postIds) {
            discussionPosts.add(postRepository.findByid(post).get(0));
        }
        return discussionPosts;

    }

    public List<DiscussionBoardEntity> getGroupDiscussionBoards(Long groupId) {
        GroupEntity group = groupRepository.findByid(groupId).get(0);
        List<DiscussionBoardEntity> discussionBoards = new ArrayList<>();
        List<Long> boardIds = group.getDiscussionBoards();
        for(long board: boardIds) {
            discussionBoards.add(getDiscussionBoardById(board));
        }
        return discussionBoards;
    }
}

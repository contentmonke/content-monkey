package com.content.monkey.backend.service;

import com.content.monkey.backend.model.DiscussionBoardEntity;
import com.content.monkey.backend.repository.DiscussionBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DiscussionBoardService {

    @Autowired
    private DiscussionBoardRepository discussionBoardRepository;

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
        newBoard.setPost_ids(new ArrayList<Integer>());
        newBoard = discussionBoardRepository.save(newBoard);
        return discussionBoardRepository.save(newBoard);
    }
}

package com.content.monkey.backend.service;

import com.content.monkey.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public void deleteListOfComments(List<Long> commentIds) throws Exception {
        try {
            commentRepository.deleteAllByIdInBatch(commentIds);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }


}

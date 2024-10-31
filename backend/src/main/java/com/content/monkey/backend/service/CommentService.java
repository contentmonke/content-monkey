package com.content.monkey.backend.service;

import com.content.monkey.backend.model.CommentEntity;
import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.UserEntity;
import com.content.monkey.backend.model.dto.CommentEntityDTO;
import com.content.monkey.backend.repository.CommentRepository;
import com.content.monkey.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.ArrayList;
import java.util.List;

import static com.content.monkey.backend.model.dto.CommentEntityDTO.convertCommentEntityToDTO;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserService userService;

    // HELPER FUNCTIONS
    private void addCommentToReview(Long reviewId, Long commentId) {
        List<ReviewEntity> reviewEntities = reviewRepository.findByid(reviewId);
        if (reviewEntities.size() == 0) {
            return;
        }
        ReviewEntity reviewEntity = reviewEntities.get(0);
        if (reviewEntity.getCommentIds() == null) {
            reviewEntity.setCommentIds(new ArrayList<>());
        }
        reviewEntity.getCommentIds().add(commentId);
        reviewRepository.save(reviewEntity);
    }

    // API SERVICES
    public CommentEntity createComment(CommentEntity commentEntity) {
        CommentEntity savedComment = commentRepository.save(commentEntity);
        addCommentToReview(savedComment.getReviewId(), savedComment.getId());
        return savedComment;
    }

    public List<CommentEntityDTO> getComments(List<Long> commentIds, int pageNumber, int pageSize) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        try {
            List<CommentEntityDTO> commentEntityDTOS = new ArrayList<>();
            Page<CommentEntity> pageResult = commentRepository.findAllByIdWithPagination(commentIds, page);
            List<CommentEntity> commentEntities = pageResult.getContent();

            for (CommentEntity entity: commentEntities ) {
                UserEntity user = userService.getUser(entity.getUserId());
                commentEntityDTOS.add(convertCommentEntityToDTO(entity, user.getName()));
            }
            return commentEntityDTOS;

        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public void deleteListOfComments(List<Long> commentIds) throws Exception {
        try {
            commentRepository.deleteAllByIdInBatch(commentIds);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}

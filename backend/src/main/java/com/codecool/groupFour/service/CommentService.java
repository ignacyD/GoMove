package com.codecool.groupFour.service;

import com.codecool.groupFour.model.Comment;
import com.codecool.groupFour.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public List<Comment> getActivityComments(UUID activityId) {
        return commentRepository.getActivityComments(activityId);
    }

    public void addComment(Comment comment) {
        commentRepository.addComment(comment);
    }

    public void updateComment(Comment comment, UUID commentId) {
        commentRepository.updateComment(comment , commentId);
    }

    public void deleteComment(UUID commentId) {
        commentRepository.deleteComment(commentId);
    }

    public List<Comment> getAllComments() {
        return commentRepository.getAllComments();
    }
}

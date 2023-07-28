package com.codecool.goMove.service;

import com.codecool.goMove.model.Comment;
import com.codecool.goMove.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public List<Comment> getActivityComments(UUID activityId) {
        return commentRepository.findByActivityId(activityId);
    }

    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    public Comment getCommentById(UUID commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("No comment with requested id"));
    }

    public void updateComment(Comment comment, UUID commentId) {
        Comment commentToUpdate = getCommentById(commentId);
        commentToUpdate.setMessage(comment.getMessage());
        commentRepository.save(commentToUpdate);
    }

    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }
}

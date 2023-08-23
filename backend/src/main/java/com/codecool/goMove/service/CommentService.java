package com.codecool.goMove.service;

import com.codecool.goMove.model.Comment;
import com.codecool.goMove.model.User;
import com.codecool.goMove.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
        Comment comment1 = new Comment(LocalDate.now(), LocalTime.now(), User.builder().userId(UUID.fromString("2222e1a7-7acf-4f50-8275-1449748e96eb")).build(), "Robimy grila na koniec?", UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        comment1.setCommentId(UUID.fromString("11110b30-7557-4a9f-8527-3e50e933fec4"));
        addComment(comment1);
        Comment comment2 = new Comment(LocalDate.now(), LocalTime.now(), User.builder().userId(UUID.fromString("1111e1a7-7acf-4f50-8275-1449748e96eb")).build(), "No pewnie że tak !", UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        comment2.setCommentId(UUID.fromString("22220b30-7557-4a9f-8527-3e50e933fec4"));
        addComment(comment2);
        Comment comment3 = new Comment(LocalDate.now(), LocalTime.now(), User.builder().userId(UUID.fromString("3333e1a7-7acf-4f50-8275-1449748e96eb")).build(), "To ja wezme ketchup.", UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        comment3.setCommentId(UUID.fromString("33330b30-7557-4a9f-8527-3e50e933fec4"));
        addComment(comment3);
        Comment comment4 = new Comment(LocalDate.now(), LocalTime.now(), User.builder().userId(UUID.fromString("4444e1a7-7acf-4f50-8275-1449748e96eb")).build(), "Na pewno aktualne?", UUID.fromString("2222e4ee-06f5-40ab-935e-442074f939a1"));
        comment4.setCommentId(UUID.fromString("44440b30-7557-4a9f-8527-3e50e933fec4"));
        addComment(comment4);
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
        return commentRepository.findById(commentId).orElse(null);
    }

    public boolean updateComment(Comment comment, UUID commentId) {
        Comment commentToUpdate = getCommentById(commentId);
        if (commentToUpdate != null) {
            commentToUpdate.setMessage(comment.getMessage());
            commentRepository.save(commentToUpdate);
            return true;
        }
        return false;
    }

    public boolean deleteComment(UUID commentId) {
        Comment commentToDelete = getCommentById(commentId);
        if (commentToDelete != null) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }
}

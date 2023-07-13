package com.codecool.groupFour.repository;

import com.codecool.groupFour.model.Comment;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class CommentRepository {

    private final List<Comment> comments;

    public CommentRepository() {
        this.comments = new ArrayList<>();

        Comment comment1 = new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("2222e1a7-7acf-4f50-8275-1449748e96eb"), "Robimy grila na koniec?", UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        comment1.setCommentId(UUID.fromString("11110b30-7557-4a9f-8527-3e50e933fec4"));
        comments.add(comment1);
        Comment comment2 = new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("1111e1a7-7acf-4f50-8275-1449748e96eb"), "No pewnie że tak !", UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        comment2.setCommentId(UUID.fromString("22220b30-7557-4a9f-8527-3e50e933fec4"));
        comments.add(comment2);
        Comment comment3 = new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("3333e1a7-7acf-4f50-8275-1449748e96eb"), "To ja wezme ketchup.", UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        comment3.setCommentId(UUID.fromString("33330b30-7557-4a9f-8527-3e50e933fec4"));
        comments.add(comment3);
        Comment comment4 = new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("4444e1a7-7acf-4f50-8275-1449748e96eb"), "Na pewno aktualne?", UUID.fromString("2222e4ee-06f5-40ab-935e-442074f939a1"));
        comment4.setCommentId(UUID.fromString("44440b30-7557-4a9f-8527-3e50e933fec4"));
        comments.add(comment4);
    }

    public List<Comment> getAllComments() {
        return comments;
    }

    public List<Comment> getActivityComments(UUID activityId) {
        return comments.stream()
                .filter(c -> c.getActivityId().equals(activityId))
                .toList();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }


    public void updateComment(Comment comment, UUID commentId) {
        Optional<Comment> commentToUpdateOptional = comments.stream()
                .filter(c -> c.getCommentId().equals(commentId))
                .findFirst();

        if (commentToUpdateOptional.isPresent()) {
            Comment commentToUpdate = commentToUpdateOptional.get();
            commentToUpdate.setMessage(comment.getMessage());
        } else {
            throw new IllegalArgumentException("No comment with requested Id");
        }
    }


    public void deleteComment(UUID commentId) {

        Optional<Comment> commentToDeleteOptional = comments.stream()
                .filter(c -> c.getCommentId().equals(commentId))
                .findFirst();

        if (commentToDeleteOptional.isPresent()) {
            comments.remove(commentToDeleteOptional.get());
        } else {
            throw new IllegalArgumentException("No comment with requested Id");
        }
    }


}

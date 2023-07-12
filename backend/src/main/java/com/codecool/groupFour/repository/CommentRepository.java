package com.codecool.groupFour.repository;

import com.codecool.groupFour.model.Activity;
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
        comments.add(new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("01e25fa4-eaaf-42e8-908c-e6edccc1c640"), "Robimy grila na koniec?", UUID.fromString("11e11fa1-eaaf-42e8-908c-e6edccc1c640")));
        comments.add(new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("01e25fa4-eaaf-42e8-908c-e6edccc1c640"), "No pewnie że tak !", UUID.fromString("11e11fa1-eaaf-42e8-908c-e6edccc1c640")));
        comments.add(new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("01e25fa4-eaaf-42e8-908c-e6edccc1c640"), "To ja wezme ketchup.", UUID.fromString("11e11fa1-eaaf-42e8-908c-e6edccc1c640")));
        comments.add(new Comment(LocalDate.now(), LocalTime.now(), UUID.fromString("01e25fa4-eaaf-42e8-908c-e6edccc1c640"), "Na pewno aktualne?", UUID.fromString("22e22fa2-eaaf-42e8-908c-e6edccc1c640")));

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

package com.codecool.groupFour.controller;

import com.codecool.groupFour.model.Comment;
import com.codecool.groupFour.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }


    @GetMapping("/{activityId}")
    public List<Comment> getActivityComments(@PathVariable UUID activityId) {
        return commentService.getActivityComments(activityId);
    }

    @PostMapping
    public void addComment(@RequestBody Comment comment) {
        commentService.addComment(comment);
    }

    @PatchMapping("/update/{commentId}")
    public void updateComment(@RequestBody Comment comment, @PathVariable UUID commentId) {
        commentService.updateComment(comment, commentId);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
    }
}

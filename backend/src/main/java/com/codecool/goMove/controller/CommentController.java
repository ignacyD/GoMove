package com.codecool.goMove.controller;

import com.codecool.goMove.model.Comment;
import com.codecool.goMove.service.CommentService;
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

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
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

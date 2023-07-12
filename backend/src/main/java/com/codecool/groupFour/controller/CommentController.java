package com.codecool.groupFour.controller;

import com.codecool.groupFour.model.Comment;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/comments")
public class CommentController {

    @GetMapping("/{activityId}")
    public List<Comment> getActivityComments(@PathVariable UUID activityId) {
        return null;
    }

    @PostMapping
    public void addComment(@RequestBody Comment comment) {
    }

    @PatchMapping("/update/{commentId}")
    public void updateComment(@RequestBody Comment comment, @PathVariable UUID commentId) {
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable UUID commentId) {
    }
}

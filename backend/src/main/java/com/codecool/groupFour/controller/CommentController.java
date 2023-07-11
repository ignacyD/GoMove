package com.codecool.groupFour.controller;

import com.codecool.groupFour.model.Comment;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/comments")
public class CommentController {
    @GetMapping
    public List<Comment> getAllComments() {
        return null;
    }

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable UUID id) {
        return null;
    }

    @PostMapping
    public void addComment(@RequestBody Comment comment) {
    }

    @PutMapping("/update/{id}")
    public void updateComment(@RequestBody Comment comment, @PathVariable UUID id) {
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable UUID id) {
    }
}

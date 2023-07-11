package com.codecool.groupFour.controller;

import com.codecool.groupFour.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping
    public List<User> getAllUsers() {
        return null;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable UUID id) {
        return null;
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
    }

    @PutMapping("/update/{id}")
    public void updateUser(@RequestBody User user, @PathVariable UUID id) {
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
    }
}

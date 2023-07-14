package com.codecool.goMove.controller;

import com.codecool.goMove.model.User;
import com.codecool.goMove.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PatchMapping("/update/{id}")
    public void updateUser(@RequestBody User user, @PathVariable UUID id) {
        userService.updateUser(user, id);
    }
}

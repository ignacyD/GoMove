package com.codecool.goMove.controller;

import com.codecool.goMove.model.User;
import com.codecool.goMove.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> addUser(@RequestBody User user) {
        boolean addPerformed = userService.addUser(user);
        if (addPerformed) {
            return ResponseEntity.status(HttpStatus.OK).body("User created");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email already exist");
    }

    @PatchMapping("/update/{id}")
    public void updateUser(@RequestBody User user, @PathVariable UUID id) {
        userService.updateUser(user, id);
    }

    @PatchMapping("/enroll/{userId}/{activityId}")
    public void enrollUser(@PathVariable UUID userId, @PathVariable UUID activityId) {
        userService.enrollUser(userId, activityId);
    }
}

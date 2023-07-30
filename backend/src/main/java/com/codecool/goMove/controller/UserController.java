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
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        User userById = userService.getUserById(id);
        if (userById != null) {
            return ResponseEntity.status(HttpStatus.OK).body(userById);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user with requested id");
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
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable UUID id) {
        boolean updatePerformed = userService.updateUser(user, id);
        if (updatePerformed) {
            return ResponseEntity.status(HttpStatus.OK).body("User updated");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user with requested id");
    }

    @PatchMapping("/enroll/{userId}/{activityId}")
    public ResponseEntity<?> enrollUser(@PathVariable UUID userId, @PathVariable UUID activityId) {
        boolean enrollPerformed = userService.enrollUser(userId, activityId);
        if (enrollPerformed) {
            return ResponseEntity.status(HttpStatus.OK).body("User enrolled to the activity");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user with requested id");
    }
}

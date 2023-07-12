package com.codecool.groupFour.service;

import com.codecool.groupFour.model.User;
import com.codecool.groupFour.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public User getUserById(UUID id) {
        return userRepository.getUserById(id);
    }

    public void addUser(User user) {
        userRepository.addUser(user);
    }

    public void updateUser(User user, UUID id) {
        userRepository.updateUser(user, id);
    }
}

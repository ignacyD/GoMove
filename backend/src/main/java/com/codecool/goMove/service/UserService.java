package com.codecool.goMove.service;

import com.codecool.goMove.model.ActivityType;
import com.codecool.goMove.model.User;
import com.codecool.goMove.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new IllegalArgumentException("No user with requested Id");
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user, UUID id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            User userToUpdate = optionalUser.get();
            userToUpdate.setUserName(user.getUserName());
            userToUpdate.setUserEmail(user.getUserEmail());
            userToUpdate.setPassword(user.getPassword());
            userToUpdate.setCity(user.getCity());
            userToUpdate.setPreferredActivity(user.getPreferredActivity());
            userRepository.save(userToUpdate);
        } else {
            throw new IllegalArgumentException("No user with requested Id");
        }
    }

    private Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }
}

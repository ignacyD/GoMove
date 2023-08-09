package com.codecool.goMove.service;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.User;
import com.codecool.goMove.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
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
        return optionalUser.orElse(null);
    }

    public boolean addUser(User user) {

        boolean userExists = userRepository.existsByUserNameOrUserEmail(user.getUsername(), user.getUserEmail());

        if (userExists) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    public boolean updateUser(User user, UUID id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isEmpty()) {
            return false;
        }

        User userToUpdate = optionalUser.get();
        if (user.getUsername() != null) {
            userToUpdate.setUserName(user.getUsername());
        }
        if (user.getUserEmail() != null) {
            userToUpdate.setUserEmail(user.getUserEmail());
        }
        if (user.getPassword() != null) {
            userToUpdate.setPassword(user.getPassword());
        }
        if (user.getCity() != null) {
            userToUpdate.setCity(user.getCity());
        }
        if (user.getPreferredActivity() != null) {
            userToUpdate.setPreferredActivity(user.getPreferredActivity());
        }
        userRepository.save(userToUpdate);
        return true;
    }

    private Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public boolean enrollUser(UUID userId, UUID activityId) {
        User userToUpdate = getUserById(userId);
        if (userToUpdate == null) {
            return false;
        }
        Set<Activity> enrolledActivities = userToUpdate.getEnrolledActivities();
        Activity activityToAdd = new Activity();
        activityToAdd.setActivityId(activityId);
        enrolledActivities.add(activityToAdd);
        userRepository.save(userToUpdate);
        return true;
    }
}

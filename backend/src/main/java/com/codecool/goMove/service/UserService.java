package com.codecool.goMove.service;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.ActivityType;
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

        User user1 = new User("Dominik", "dominik@gmail.com", "dominik", ActivityType.CYCLING, "Radziszow");
        user1.setUserId(UUID.fromString("1111e1a7-7acf-4f50-8275-1449748e96eb"));
        addUser(user1);
        User user2 = new User("Kamil", "kamil@gmail.com", "kamil", ActivityType.WALKING, "Krzeszowice");
        user2.setUserId(UUID.fromString("2222e1a7-7acf-4f50-8275-1449748e96eb"));
        addUser(user2);
        User user3 = new User("Jakub", "jakub@gmail.com", "jakub", ActivityType.RUNNING, "Orly");
        user3.setUserId(UUID.fromString("3333e1a7-7acf-4f50-8275-1449748e96eb"));
        addUser(user3);
        User user4 = new User("Ignacy", "ignacy@gmail.com", "ignacy", ActivityType.SKATING, "Warszawa");
        user4.setUserId(UUID.fromString("4444e1a7-7acf-4f50-8275-1449748e96eb"));
        addUser(user4);
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

    public void enrollUser(UUID userId, UUID activityId) {
        User userToUpdate = getUserById(userId);
        Set<Activity> enrolledActivities = userToUpdate.getEnrolledActivities();
        Activity activityToAdd = new Activity();
        activityToAdd.setActivityId(activityId);
        enrolledActivities.add(activityToAdd);
        userRepository.save(userToUpdate);
    }
}

package com.codecool.goMove.repository;

import com.codecool.goMove.model.ActivityType;
import com.codecool.goMove.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepository {

    private final List<User> users;

    public UserRepository() {
        this.users = new ArrayList<>();

        User user1 = new User("Dominik", "dominik@gmail.com", "dominik", ActivityType.CYCLING, "Radziszow");
        user1.setUserId(UUID.fromString("1111e1a7-7acf-4f50-8275-1449748e96eb"));
        users.add(user1);
        User user2 = new User("Kamil", "kamil@gmail.com", "kamil", ActivityType.WALKING, "Krzeszowice");
        user2.setUserId(UUID.fromString("2222e1a7-7acf-4f50-8275-1449748e96eb"));
        users.add(user2);
        User user3 = new User("Jakub", "jakub@gmail.com", "jakub", ActivityType.RUNNING, "Orly");
        user3.setUserId(UUID.fromString("3333e1a7-7acf-4f50-8275-1449748e96eb"));
        users.add(user3);
        User user4 = new User("Ignacy", "ignacy@gmail.com", "ignacy", ActivityType.SKATING, "Warszawa");
        user4.setUserId(UUID.fromString("4444e1a7-7acf-4f50-8275-1449748e96eb"));
        users.add(user4);
    }

    public List<User> getAllUsers() {
        return users;
    }

    public User getUserById(UUID id) {
        Optional<User> optionalUser = getAllUsers().stream()
                .filter(activity -> activity.getUserId().equals(id))
                .findFirst();
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new IllegalArgumentException("No user with requested Id");
    }

    public void addUser(User user) {
        users.add(user);
    }

    public void updateUser(User user, UUID id) {
        Optional<User> userToUpdateOptional = users.stream()
                .filter(u -> u.getUserId().equals(id))
                .findFirst();

        if (userToUpdateOptional.isPresent()) {
            User userToUpdate = userToUpdateOptional.get();
            userToUpdate.setUserName(user.getUserName());
            userToUpdate.setUserEmail(user.getUserEmail());
            userToUpdate.setPassword(user.getPassword());
            userToUpdate.setCity(user.getCity());
            userToUpdate.setPreferredActivity(user.getPreferredActivity());
        } else {
            throw new IllegalArgumentException("No user with requested Id");
        }
    }
}

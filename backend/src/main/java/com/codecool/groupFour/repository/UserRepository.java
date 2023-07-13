package com.codecool.groupFour.repository;

import com.codecool.groupFour.model.ActivityType;
import com.codecool.groupFour.model.User;
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

        users.add(new User("Dominik", "dominik@gmail.com", "dominik", ActivityType.CYCLING, "Radziszow"));
        users.add(new User("Kamil", "kamil@gmail.com", "kamil", ActivityType.WALKING, "Krzeszowice"));
        users.add(new User("Jakub", "jakub@gmail.com", "jakub", ActivityType.RUNNING, "Orly"));
        users.add(new User("Ignacy", "ignacy@gmail.com", "ignacy", ActivityType.SKATING, "Warszawa"));
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

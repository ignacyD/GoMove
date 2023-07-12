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

        users.add(new User(UUID.fromString("e024e4b6-f49a-41d4-8d5e-db7fd91b7225"), "Dominik", "dominik@gmail.com", "dominik", ActivityType.CYCLING, "Radziszow"));
        users.add(new User(UUID.fromString("9886e1a7-7acf-4f50-8275-1449748e96eb"), "Kamil", "kamil@gmail.com", "kamil", ActivityType.WALKING, "Krzeszowice"));
        users.add(new User(UUID.fromString("dd57746b-980b-4eaa-80c1-968c6f921560"), "Jakub", "jakub@gmail.com", "jakub", ActivityType.RUNNING, "Orly"));
        users.add(new User(UUID.fromString("f6f12683-9487-4ccb-90bc-ad3405120407"), "Ignacy", "ignacy@gmail.com", "ignacy", ActivityType.SKATING, "Warszawa"));
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
            userToUpdate.setUserName(user.getUserEmail());
            userToUpdate.setPassword(user.getPassword());
            userToUpdate.setCity(user.getCity());
            userToUpdate.setPreferredActivity(user.getPreferredActivity());
        } else {
            throw new IllegalArgumentException("No user with requested Id");
        }
    }
}

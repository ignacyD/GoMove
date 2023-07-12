package com.codecool.groupFour.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class User {
    private final UUID userId;
    private String userName;
    private String userEmail;
    private String password;
    private String city;
    private List<ActivityType> preferredActivities;
    private List<UUID> userActivitiesId;
    private List<UUID> favouriteActivitiesId;
    private String gender;
    private String description;
    private String userPhotoUrl;

    public User(String userName, String userEmail, String password) {
        this.userId = UUID.randomUUID();
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
        this.preferredActivities = new ArrayList<>();
        this.userActivitiesId = new ArrayList<>();
        this.favouriteActivitiesId = new ArrayList<>();
    }
}

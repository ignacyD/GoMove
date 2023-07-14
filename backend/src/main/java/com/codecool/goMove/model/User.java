package com.codecool.goMove.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class User {
    private UUID userId;
    private String userName;
    private String userEmail;
    private String password;
    private String city;
    private ActivityType preferredActivity;
    private List<UUID> userActivitiesIds;
    private String gender;
    private String description;
    private String userPhotoUrl;

    public User(String userName, String userEmail, String password, ActivityType preferredActivity, String city) {
        this.userId = UUID.randomUUID();
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
        this.city = city;
        this.preferredActivity = preferredActivity;
        this.userActivitiesIds = new ArrayList<>();
    }
}

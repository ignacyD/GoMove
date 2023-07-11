package com.codecool.groupFour.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class User {
    private final UUID userId;
    private String userName;
    private String userEmail;
    private String password;
    private String location;
    private List<ActivityType> preferredActivities;
    private List<UUID> userActivitiesId;
    private List<UUID> favouriteActivitiesId;
    private String gender;
    private String description;
    private String userPhotoUrl;
}

package com.codecool.goMove.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    private UUID userId = UUID.randomUUID();
    private String userName;
    private String userEmail;
    private String password;
    private String city;
    @Enumerated(EnumType.STRING)
    private ActivityType preferredActivity;
    @ManyToMany
    @JoinTable(
            name="user_activity",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    private Set<Activity> enrolledActivities;
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
        this.enrolledActivities = new HashSet<>();
    }
}

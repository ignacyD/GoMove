package com.codecool.goMove.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class User {
    @Id
    private UUID userId = UUID.randomUUID();
    @NotBlank(message = "name is mandatory")
    private String userName;
    @NotBlank(message = "email is mandatory")
    @Email
    private String userEmail;
    @NotBlank(message = "password is mandatory")
    private String password;
    private String city;
    @Enumerated(EnumType.STRING)
    private ActivityType preferredActivity;
    @JsonIgnore
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

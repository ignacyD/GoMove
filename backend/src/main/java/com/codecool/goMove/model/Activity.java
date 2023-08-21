package com.codecool.goMove.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "activities")
@Setter
@Getter
@NoArgsConstructor
public class Activity {
    @Id
    private UUID activityId = UUID.randomUUID();
    @Enumerated(EnumType.STRING)
    @NotNull(message = "activity type is mandatory")
    private ActivityType activityType;
    @NotNull(message = "owner is mandatory")
    @ManyToOne
    private User owner;
    @NotBlank(message = "title is mandatory")
    private String title;
    @NotBlank(message = "city is mandatory")
    private String city;
    @NotBlank(message = "street is mandatory")
    private String street;
    @NotNull(message = "date is mandatory")
    private LocalDate date;
    @NotNull(message = "time is mandatory")
    private LocalTime time;
    private String description;

    @ManyToMany(mappedBy = "enrolledActivities")
    private Set<User> participants;
    private String activityPhotoUrl;

    public Activity(ActivityType activityType, User owner, String title, String city, String street, LocalDate date, LocalTime time, String description) {
        this.activityId = UUID.randomUUID();
        this.activityType = activityType;
        this.owner = owner;
        this.title = title;
        this.city = city;
        this.street = street;
        this.date = date;
        this.time = time;
        this.description = description;
        this.participants = new HashSet<>();
    }

    public void removeParticipant(User user) {
        this.participants.remove(user);
        user.getEnrolledActivities().remove(this);
    }
}



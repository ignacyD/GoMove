package com.codecool.goMove.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
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
    private ActivityType activityType;
    private UUID ownerId;
    private String title;
    private String city;
    private String street;
    private LocalDate date;
    private LocalTime time;
    private String description;
    @ManyToMany(mappedBy = "enrolledActivities")
    private Set<User> participants;
    private String activityPhotoUrl;

    public Activity(ActivityType activityType, UUID ownerId, String title, String city, String street, LocalDate date, LocalTime time, String description) {
        this.activityId = UUID.randomUUID();
        this.activityType = activityType;
        this.ownerId = ownerId;
        this.title = title;
        this.city = city;
        this.street = street;
        this.date = date;
        this.time = time;
        this.description = description;
        this.participants = new HashSet<>();
    }
}


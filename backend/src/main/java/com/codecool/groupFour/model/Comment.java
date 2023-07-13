package com.codecool.groupFour.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter

public class Comment {
    private UUID commentId;
    private LocalDate date;
    private LocalTime time;
    private UUID userId;
    private String message;
    private UUID activityId;

    public Comment(LocalDate date, LocalTime time, UUID userId, String message, UUID activityId) {
        this.commentId = UUID.randomUUID();
        this.date = date;
        this.time = time;
        this.userId = userId;
        this.message = message;
        this.activityId = activityId;
    }
}

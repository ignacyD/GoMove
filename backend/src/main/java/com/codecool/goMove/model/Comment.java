package com.codecool.goMove.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
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

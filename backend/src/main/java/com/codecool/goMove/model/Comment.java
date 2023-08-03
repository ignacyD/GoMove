package com.codecool.goMove.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    private UUID commentId = UUID.randomUUID();
    @NotNull(message = "date is mandatory")
    private LocalDate date;
    @NotNull(message = "time is mandatory")
    private LocalTime time;
    @NotNull(message = "user id is mandatory")
    private UUID userId;
    @NotBlank(message = "message is mandatory")
    private String message;
    @NotNull(message = "activity id is mandatory")
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

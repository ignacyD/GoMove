package com.codecool.groupFour.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class Comment {
    private final UUID commentId;
    private LocalDate date;
    private LocalTime time;
    private UUID owner;
    private String message;
}

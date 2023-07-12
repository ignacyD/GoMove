package com.codecool.groupFour.repository;

import com.codecool.groupFour.model.Activity;
import com.codecool.groupFour.model.ActivityType;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class ActivityRepository {

    private final List<Activity> activities;

    public ActivityRepository() {
        this.activities = new ArrayList<>();
        activities.add(new Activity(ActivityType.RUNNING, UUID.fromString("01e25fa4-eaaf-42e8-908c-e6edccc1c640"), "Bieganie z Dominikem", "Radziszow", "Prosta", LocalDate.parse("2023-07-13"), LocalTime.parse("17:00:00"), "Zapraszam na bieganie"));
        activities.add(new Activity(ActivityType.CYCLING, UUID.fromString("1eb9a924-cdd0-4963-8eff-5069a74ba836"), "Rowerowanie z Kamilem", "Krzeszowice", "Bandurskiego", LocalDate.parse("2023-07-14"), LocalTime.parse("13:00:00"), "Zapraszam na jazdę na rowerze"));
        activities.add(new Activity(ActivityType.SKATING, UUID.fromString("7b5f3689-9f44-44ae-adbf-6d03a80eafa6"), "Rolki z Ignacym", "Warszawa", "Niemcewicza", LocalDate.parse("2023-07-15"), LocalTime.parse("15:00:00"), "Zapraszam na rolki"));
        activities.add(new Activity(ActivityType.WALKING, UUID.fromString("9f0170cc-053b-4267-a3c9-e537710a793a"), "Spacer z Jakubem", "Orly", "Sportowa", LocalDate.parse("2023-07-16"), LocalTime.parse("20:00:00"), "Zapraszam na spacer"));
    }

    public List<Activity> getAllActivities() {
        return activities;
    }

    public Activity getActivityById(UUID id) {
        Optional<Activity> optionalActivity = activities.stream()
                .filter(activity -> activity.getActivityId().equals(id))
                .findFirst();
        if (optionalActivity.isPresent()) {
            return optionalActivity.get();
        }
        throw new IllegalArgumentException("No activity with requested Id");
    }

    public List<Activity> getActivitiesByTypeAndCity(String city, ActivityType type) {
        return activities.stream()
                .filter(activity -> activity.getCity().equals(city))
                .filter((activity -> activity.getActivityType().equals(type)))
                .collect(Collectors.toList());
    }

    public List<Activity> getActivitiesByType(ActivityType type) {
        return activities.stream()
                .filter(activity -> activity.getActivityType().equals(type))
                .collect(Collectors.toList());
    }

    public List<Activity> getActivitiesByCity(String city) {
        return activities.stream()
                .filter(activity -> activity.getCity().equals(city))
                .collect(Collectors.toList());
    }

    public void addActivity(Activity activity) {
        activities.add(activity);
    }

    public void updateActivity(Activity activity, UUID id) {
        Optional<Activity> activityToUpdateOptional = activities.stream()
                .filter(a -> a.getActivityId().equals(id))
                .findFirst();

        if (activityToUpdateOptional.isPresent()) {
            Activity activityToUpdate = activityToUpdateOptional.get();
            activityToUpdate.setActivityType(activity.getActivityType());
            activityToUpdate.setTitle(activity.getTitle());
            activityToUpdate.setCity(activity.getCity());
            activityToUpdate.setStreet(activity.getStreet());
            activityToUpdate.setDate(activity.getDate());
            activityToUpdate.setTime(activity.getTime());
            activityToUpdate.setDescription(activity.getDescription());
        } else {
            throw new IllegalArgumentException("No activity with requested Id");
        }
    }

    public void deleteActivity(UUID id) {

        Optional<Activity> activityToDeleteOptional = activities.stream()
                .filter(a -> a.getActivityId().equals(id))
                .findFirst();

        if (activityToDeleteOptional.isPresent()) {
            activities.remove(activityToDeleteOptional.get());
        } else {
            throw new IllegalArgumentException("No activity with requested Id");
        }
    }
}
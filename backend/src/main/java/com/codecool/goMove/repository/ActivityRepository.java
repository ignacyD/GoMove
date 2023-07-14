package com.codecool.goMove.repository;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.ActivityType;
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
        Activity activity1 = new Activity(ActivityType.RUNNING, UUID.fromString("1111e1a7-7acf-4f50-8275-1449748e96eb"), "Bieganie z Dominikem", "Radziszow", "Prosta", LocalDate.parse("2023-07-13"), LocalTime.parse("17:00:00"), "Zapraszam na bieganie");
        activity1.setActivityId(UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        activities.add(activity1);
        Activity activity2 = new Activity(ActivityType.CYCLING, UUID.fromString("2222e1a7-7acf-4f50-8275-1449748e96eb"), "Rowerowanie z Kamilem", "Krzeszowice", "Bandurskiego", LocalDate.parse("2023-07-14"), LocalTime.parse("13:00:00"), "Zapraszam na jazdę na rowerze");
        activity2.setActivityId(UUID.fromString("2222e4ee-06f5-40ab-935e-442074f939a1"));
        activities.add(activity2);
        Activity activity3 = new Activity(ActivityType.WALKING, UUID.fromString("3333e1a7-7acf-4f50-8275-1449748e96eb"), "Spacer z Jakubem", "Orly", "Sportowa", LocalDate.parse("2023-07-16"), LocalTime.parse("20:00:00"), "Zapraszam na spacer");
        activity3.setActivityId(UUID.fromString("3333e4ee-06f5-40ab-935e-442074f939a1"));
        activities.add(activity3);
        Activity activity4 = new Activity(ActivityType.SKATING, UUID.fromString("4444e1a7-7acf-4f50-8275-1449748e96eb"), "Rolki z Ignacym", "Warszawa", "Niemcewicza", LocalDate.parse("2023-07-15"), LocalTime.parse("15:00:00"), "Zapraszam na rolki");
        activity4.setActivityId(UUID.fromString("4444e4ee-06f5-40ab-935e-442074f939a1"));
        activities.add(activity4);
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
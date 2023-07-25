package com.codecool.goMove.service;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.ActivityType;
import com.codecool.goMove.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;

        Activity activity1 = new Activity(ActivityType.RUNNING, UUID.fromString("1111e1a7-7acf-4f50-8275-1449748e96eb"), "Bieganie z Dominikem", "Radziszow", "Prosta", LocalDate.parse("2023-07-13"), LocalTime.parse("17:00:00"), "Zapraszam na bieganie");
        activity1.setActivityId(UUID.fromString("1111e4ee-06f5-40ab-935e-442074f939a1"));
        addActivity(activity1);
        Activity activity2 = new Activity(ActivityType.CYCLING, UUID.fromString("2222e1a7-7acf-4f50-8275-1449748e96eb"), "Rowerowanie z Kamilem", "Krzeszowice", "Bandurskiego", LocalDate.parse("2023-07-14"), LocalTime.parse("13:00:00"), "Zapraszam na jazdę na rowerze");
        activity2.setActivityId(UUID.fromString("2222e4ee-06f5-40ab-935e-442074f939a1"));
        addActivity(activity2);
        Activity activity3 = new Activity(ActivityType.WALKING, UUID.fromString("3333e1a7-7acf-4f50-8275-1449748e96eb"), "Spacer z Jakubem", "Orly", "Sportowa", LocalDate.parse("2023-07-16"), LocalTime.parse("20:00:00"), "Zapraszam na spacer");
        activity3.setActivityId(UUID.fromString("3333e4ee-06f5-40ab-935e-442074f939a1"));
        addActivity(activity3);
        Activity activity4 = new Activity(ActivityType.SKATING, UUID.fromString("4444e1a7-7acf-4f50-8275-1449748e96eb"), "Rolki z Ignacym", "Warszawa", "Niemcewicza", LocalDate.parse("2023-07-15"), LocalTime.parse("15:00:00"), "Zapraszam na rolki");
        activity4.setActivityId(UUID.fromString("4444e4ee-06f5-40ab-935e-442074f939a1"));
        addActivity(activity4);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(UUID id) {
        return activityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No activity with requested id"));
    }

    public List<Activity> getActivitiesByTypeAndCity(String city, ActivityType type) {
        if (city == null && type != null) {
            return activityRepository.findByActivityType(type);
        } else if (city != null && type == null) {
            return activityRepository.findByCity(city);
        } else {
            return activityRepository.findByActivityTypeAndCity(type, city);
        }
    }

    public List<Activity> getActivitiesByOwner(UUID ownerId) {
        return activityRepository.findByOwnerId(ownerId);
    }

    public void addActivity(Activity activity) {
        activityRepository.save(activity);
    }

    public void updateActivity(Activity activity, UUID id) {
        Activity activityToUpdate = getActivityById(id);
        activityToUpdate.setActivityType(activity.getActivityType());
        activityToUpdate.setTitle(activity.getTitle());
        activityToUpdate.setCity(activity.getCity());
        activityToUpdate.setStreet(activity.getStreet());
        activityToUpdate.setDate(activity.getDate());
        activityToUpdate.setTime(activity.getTime());
        activityToUpdate.setDescription(activity.getDescription());
        activityRepository.save(activityToUpdate);
    }

    public void deleteActivity(UUID id) {
        activityRepository.deleteById(id);
    }

//    public List<Activity> getActivitiesByParticipantId(UUID uuid) {
//        return activityRepository.findByParticipants(uuid);
//    }

}
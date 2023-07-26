package com.codecool.goMove.service;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.ActivityType;
import com.codecool.goMove.model.User;
import com.codecool.goMove.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
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

        if (activityRepository.findById(id).isPresent()) {
            Activity activityToDelete = activityRepository.findById(id).get();
            for(User user : activityToDelete.getParticipants()){
                activityToDelete.removeParticipant(user);
            }
            activityRepository.deleteById(id);
        }
    }

    public List<Activity> getActivitiesByParticipantId(UUID uuid) {
        return activityRepository.getActivitiesByParticipantId(uuid);
    }

    public List<String> getAllCities() {
        return activityRepository.getAllCities();
    }
}
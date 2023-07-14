package com.codecool.goMove.service;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.ActivityType;
import com.codecool.goMove.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getAllActivities() {
        return activityRepository.getAllActivities();
    }

    public Activity getActivityById(UUID id) {
        return activityRepository.getActivityById(id);
    }

    public List<Activity> getActivitiesByTypeAndCity(String city, ActivityType type) {
        if (city == null && type != null) {
            return activityRepository.getActivitiesByType(type);
        } else if (city != null && type == null) {
            return activityRepository.getActivitiesByCity(city);
        } else {
            return activityRepository.getActivitiesByTypeAndCity(city, type);
        }
    }

    public void addActivity(Activity activity) {
        activityRepository.addActivity(activity);
    }

    public void updateActivity(Activity activity, UUID id) {
        activityRepository.updateActivity(activity, id);
    }

    public void deleteActivity(UUID id) {
        activityRepository.deleteActivity(id);
    }
}
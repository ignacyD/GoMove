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
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public List<Activity> getFutureActivities() {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        return activityRepository.findByDateAfter(today.minusDays(1)).stream()
                .filter(activity -> activity.getDate().isAfter(today)
                        || (activity.getDate().isEqual(today) && activity.getTime().isAfter(now)))
                .collect(Collectors.toList());
    }

    public Activity getActivityById(UUID id) {
        Optional<Activity> optionalActivityById = activityRepository.findById(id);
        return optionalActivityById.orElse(null);
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

    public List<Activity> getActivitiesByParticipantId(UUID uuid) {
        return activityRepository.getActivitiesByParticipantId(uuid);
    }

    public List<String> getAllCities() {
        return activityRepository.getAllCities();
    }

    public boolean addActivity(Activity activity) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        if (activity.getDate().isAfter(today)
                || activity.getDate().equals(today) && activity.getTime().isAfter(now)) {
            activityRepository.save(activity);
            return true;
        }
        return false;
    }

    public boolean updateActivity(Activity activity, UUID id) {
        Activity activityToUpdate = getActivityById(id);
        if (activityToUpdate == null) {
            return false;
        }
        if (activity.getActivityType() != null) {
            activityToUpdate.setActivityType(activity.getActivityType());
        }
        if (activity.getTitle() != null) {
            activityToUpdate.setTitle(activity.getTitle());
        }
        if (activity.getCity() != null) {
            activityToUpdate.setCity(activity.getCity());
        }
        if (activity.getStreet() != null) {
            activityToUpdate.setStreet(activity.getStreet());
        }
        if (activity.getDate() != null) {
            activityToUpdate.setDate(activity.getDate());
        }
        if (activity.getTime() != null) {
            activityToUpdate.setTime(activity.getTime());
        }
        if (activity.getDescription() != null) {
            activityToUpdate.setDescription(activity.getDescription());
        }
        activityRepository.save(activityToUpdate);
        return true;
    }

    public boolean deleteActivity(UUID id) {

        if (activityRepository.findById(id).isPresent()) {
            Activity activityToDelete = activityRepository.findById(id).get();
            for (User user : activityToDelete.getParticipants()) {
                activityToDelete.removeParticipant(user);
            }
            activityRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
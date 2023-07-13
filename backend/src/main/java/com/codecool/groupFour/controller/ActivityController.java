package com.codecool.groupFour.controller;

import com.codecool.groupFour.model.Activity;
import com.codecool.groupFour.model.ActivityType;
import com.codecool.groupFour.service.ActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable UUID id) {
        return activityService.getActivityById(id);
    }

    @GetMapping("/filter")
    public List<Activity> getActivitiesByTypeAndCity(@RequestParam(required = false) String city,
                                                     @RequestParam(required = false) ActivityType type) {
        return activityService.getActivitiesByTypeAndCity(city, type);
    }

    @PostMapping
    public void addActivity(@RequestBody Activity activity) {
        activityService.addActivity(activity);
    }

    @PatchMapping("/update/{id}")
    public void updateActivity(@RequestBody Activity activity, @PathVariable UUID id) {
        activityService.updateActivity(activity, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteActivity(@PathVariable UUID id) {
        activityService.deleteActivity(id);
    }
}

package com.codecool.groupFour.controller;

import com.codecool.groupFour.model.Activity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/activities")
public class ActivityController {
    @GetMapping
    public List<Activity> getAllActivities() {
        return null;
    }

    @GetMapping("/{id}")
    public Activity getActivity(@PathVariable UUID id) {
        return null;
    }

    @PostMapping
    public void addActivity(@RequestBody Activity activity) {
    }

    @PutMapping("/update/{id}")
    public void updateActivity(@RequestBody Activity activity, @PathVariable UUID id) {
    }

    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable UUID id) {
    }
}

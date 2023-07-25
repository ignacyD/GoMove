package com.codecool.goMove.repository;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.ActivityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, UUID> {

    List<Activity> findByActivityType(ActivityType activityType);

    List<Activity> findByCity(String city);

    List<Activity> findByActivityTypeAndCity(ActivityType activityType, String city);

    List<Activity> findByOwnerId(UUID uuid);

    @Query("SELECT a FROM Activity a WHERE :userUuid IN (SELECT u.userId FROM a.participants u)")
    List<Activity> getActivitiesByParticipantId (UUID userUuid);
}
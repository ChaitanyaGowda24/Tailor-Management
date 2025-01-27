package com.Tailor.NotificationService.repository;

import com.Tailor.NotificationService.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Custom queries can be added here if needed

    List<Notification> findByUserId(Long userId);
}

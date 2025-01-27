package com.Tailor.NotificationService.controller;

import com.Tailor.NotificationService.model.Notification;
import com.Tailor.NotificationService.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Create a new notification
    @PostMapping("/add")
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(
                notification.getTailorId(),
                notification.getUserId(),
                notification.getOrderId(),
                notification.getMessage(),
                notification.getStatus()
        );
    }

    // Get a notification by ID
    @GetMapping("/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable Long userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

}

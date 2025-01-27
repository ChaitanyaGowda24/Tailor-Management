package com.Tailor.NotificationService.controller;

import com.Tailor.NotificationService.model.Notification;
import com.Tailor.NotificationService.model.Status;
import com.Tailor.NotificationService.repository.NotificationRepository;
import com.Tailor.NotificationService.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    NotificationRepository notificationRepository;

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

    @PutMapping("/readNotification/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);

        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setStatus(Status.READ); // Set the status to "READ"
            notificationRepository.save(notification); // Save the updated notification

            return ResponseEntity.ok("Notification marked as read");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }
    }


    @GetMapping("/unread/{userId}")
    public List<Notification> getUnreadNotificationsByUserId(@PathVariable Long userId) {
        return notificationService.getUnreadNotificationsByUserId(userId);
    }
}

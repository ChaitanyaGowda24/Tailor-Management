package com.Tailor.NotificationService.service;

import com.Tailor.NotificationService.model.Notification;
import com.Tailor.NotificationService.model.Status;
import com.Tailor.NotificationService.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Method to create a new notification
    public Notification createNotification(Long tailorId, Long userId, Long orderId, String message, Status status) {
        Notification notification = new Notification();
        notification.setTailorId(tailorId);
        notification.setUserId(userId);  // userId maps to customerId in your model
        notification.setOrderId(orderId);
        notification.setMessage(message);
        notification.setStatus(status);

        return notificationRepository.save(notification);
    }


    // Method to get a notification by ID
    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification readNotification(Long id, Status status){
        Notification notification = notificationRepository.findById(id).orElse(null);
        notification.setStatus(status);
        return  notification;
    }

    public List<Notification> getUnreadNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId)
                .stream()
                .filter(notification -> notification.getStatus().equals(Status.UNREAD))
                .toList();
    }

}

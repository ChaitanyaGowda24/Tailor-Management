package com.Tailor.NotificationService.model;

import jakarta.persistence.*;

@Entity

public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    private Long tailorId; // ID of the tailor
    private Long userId; // ID of the customer
    private Long orderId; // ID of the order

    private String message; // Notification message

    @Enumerated(EnumType.STRING)
    private Status status; // Enum for notification status

    public Notification() {
    }

    public Notification(Long id, Long tailorId, Long userId, Long orderId, String message, Status status) {
        this.id = id;
        this.tailorId = tailorId;
        this.userId = userId;
        this.orderId = orderId;
        this.message = message;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTailorId() {
        return tailorId;
    }

    public void setTailorId(Long tailorId) {
        this.tailorId = tailorId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long customerId) {
        this.userId = customerId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

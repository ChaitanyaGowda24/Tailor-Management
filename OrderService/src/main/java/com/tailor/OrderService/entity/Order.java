package com.tailor.OrderService.entity;

import com.tailor.OrderService.dtos.OrderDetailsDTO;
import jakarta.persistence.*;

//import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private Long customerId;
    private Long measureId;
    private Long tailorId;
    private Long shopId;
    private Date orderDate;
    private Date deliveryDate;
    private boolean willProvideCloth; // Whether the customer will provide the cloth material
    private String clothType; // Type of cloth (if customer does not provide)
    private String clothColor; // Color of cloth (if customer does not provide)

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        YET_TO_PICK_UP,
        PENDING,
        IN_PROGRESS,
        COMPLETED,
        REJECTED
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public boolean isWillProvideCloth() {
        return willProvideCloth;
    }

    public void setWillProvideCloth(boolean willProvideCloth) {
        this.willProvideCloth = willProvideCloth;
    }

    public String getClothType() {
        return clothType;
    }

    public void setClothType(String clothType) {
        this.clothType = clothType;
    }

    public String getClothColor() {
        return clothColor;
    }

    public void setClothColor(String clothColor) {
        this.clothColor = clothColor;
    }

    public Order(Long orderId, Long customerId, Long measureId, Long tailorId, Long shopId, Date orderDate, Date deliveryDate, boolean willProvideCloth, String clothType, String clothColor, Status status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.measureId = measureId;
        this.tailorId = tailorId;
        this.shopId = shopId;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.willProvideCloth = willProvideCloth;
        this.clothType = clothType;
        this.clothColor = clothColor;
        this.status = status;
    }

    public Order() {
    }

    public Long getTailorId() {
        return tailorId;
    }

    public void setTailorId(Long tailorId) {
        this.tailorId = tailorId;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }
// Getters and Setters

    public Long getMeasureId() {
        return measureId;
    }

    public void setMeasureId(Long measureId) {
        this.measureId = measureId;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}


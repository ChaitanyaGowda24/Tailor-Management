package com.tailor.OrderService.dtos;

import com.tailor.OrderService.entity.Order;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public class OrderDetailsDTO {

    private Long orderId;
    private Date orderDate;
    private CustomerDetailsDTO customerDetails;
    private MeasurementDetailsDTO measurementDetails;
    private Order.Status status;
    private Date deliveryDate;
    private boolean willProvideCloth;
    private String clothType;
    private String clothColor;
    private Long tailorId;

    public Long getTailorId() {
        return tailorId;
    }

    public void setTailorId(Long tailorId) {
        this.tailorId = tailorId;
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

    public OrderDetailsDTO() {
    }

    public CustomerDetailsDTO getCustomerDetails() {
        return customerDetails;
    }

    public void setCustomerDetails(CustomerDetailsDTO customerDetails) {
        this.customerDetails = customerDetails;
    }

    public MeasurementDetailsDTO getMeasurementDetails() {
        return measurementDetails;
    }

    public void setMeasurementDetails(MeasurementDetailsDTO measurementDetails) {
        this.measurementDetails = measurementDetails;
    }

    public OrderDetailsDTO(Long orderId, Date orderDate, CustomerDetailsDTO customerDetails, MeasurementDetailsDTO measurementDetails, Order.Status status, Date deliveryDate, boolean willProvideCloth, String clothType, String clothColor, Long tailorId) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.customerDetails = customerDetails;
        this.measurementDetails = measurementDetails;
        this.status = status;
        this.deliveryDate = deliveryDate;
        this.willProvideCloth = willProvideCloth;
        this.clothType = clothType;
        this.clothColor = clothColor;
        this.tailorId = tailorId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }


    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }


    public Order.Status getStatus() {
        return status;
    }

    public void setStatus(Order.Status status) {
        this.status = status;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }


}

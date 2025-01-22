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

    public OrderDetailsDTO(Long orderId,Date orderDate, CustomerDetailsDTO customerDetails, MeasurementDetailsDTO measurementDetails, Order.Status status, Date deliveryDate) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.customerDetails = customerDetails;
        this.measurementDetails = measurementDetails;
        this.status = status;
        this.deliveryDate = deliveryDate;
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

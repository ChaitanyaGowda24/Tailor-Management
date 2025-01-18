package com.tailor.OrderService.dtos;

public class MeasurementDetailsDTO {

    Long measurement_id;
    Long customer_id;
    Gender gender;
    String category;
    String design;
    String measurements;
    Double totalPrice;

    enum Gender {
        MALE,
        FEMALE
    }
}

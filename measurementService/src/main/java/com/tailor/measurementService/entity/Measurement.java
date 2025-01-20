package com.tailor.measurementService.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Measurement {
    @Id
    @GeneratedValue
    Long measurement_id;
    Long userId;
    Gender gender;
    String category;
    String design;
    String measurements;
    Double  price;

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getMeasurement_id() {
        return measurement_id;
    }

    public void setMeasurement_id(Long measurement_id) {
        this.measurement_id = measurement_id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDesign() {
        return design;
    }

    public void setDesign(String design) {
        this.design = design;
    }

    public String getMeasurements() {
        return measurements;
    }

    public void setMeasurements(String measurements) {
        this.measurements = measurements;
    }

    public Measurement() {
    }

    public Measurement(Long measurement_id, Long userId, Gender gender, String category, String design, String measurements, Double price) {
        this.measurement_id = measurement_id;
        this.userId = userId;
        this.gender = gender;
        this.category = category;
        this.design = design;
        this.measurements = measurements;
        this.price = price;
    }
}

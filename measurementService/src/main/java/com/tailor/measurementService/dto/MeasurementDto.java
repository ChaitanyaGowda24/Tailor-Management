package com.tailor.measurementService.dto;

import com.tailor.measurementService.entity.Gender;

public class MeasurementDto {
    Long measurement_id;
    Gender gender;
    String category;
    String design;
    String measurements;

    public Long getMeasurement_id() {
        return measurement_id;
    }

    public void setMeasurement_id(Long measurement_id) {
        this.measurement_id = measurement_id;
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

    public MeasurementDto(Long measurement_id, Gender gender, String category, String design, String measurements) {
        this.measurement_id = measurement_id;
        this.gender = gender;
        this.category = category;
        this.design = design;
        this.measurements = measurements;
    }

    public MeasurementDto() {
    }
}

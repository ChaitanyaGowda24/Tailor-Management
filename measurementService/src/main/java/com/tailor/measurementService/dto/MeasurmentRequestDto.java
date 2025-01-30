package com.tailor.measurementService.dto;

public class MeasurmentRequestDto {
    private Long userId;
    private Long tailorId;
    private String gender;
    private String category;
    private String design;
    private String measurements;
    private Double price;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getTailorId() { return tailorId; }
    public void setTailorId(Long tailorId) { this.tailorId = tailorId; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDesign() { return design; }
    public void setDesign(String design) { this.design = design; }

    public String getMeasurements() { return measurements; }
    public void setMeasurements(String measurements) { this.measurements = measurements; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }


}
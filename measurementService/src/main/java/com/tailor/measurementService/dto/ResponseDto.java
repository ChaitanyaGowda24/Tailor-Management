package com.tailor.measurementService.dto;


public class ResponseDto {
    private MeasurementDto measurementDto;
    private CustomerDto customerDto;

    public ResponseDto(MeasurementDto measurementDto,   CustomerDto customerDto) {
        this.measurementDto = measurementDto;
        this.customerDto = customerDto;
    }

    public MeasurementDto getMeasurementDto() {
        return measurementDto;
    }

    public void setMeasurementDto(MeasurementDto measurementDto) {
        this.measurementDto = measurementDto;
    }


    public CustomerDto getCustomerDto() {
        return customerDto;
    }

    public void setCustomerDto(CustomerDto customerDto) {
        this.customerDto = customerDto;
    }

    public ResponseDto() {
    }
}

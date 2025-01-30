package com.tailor.measurementService.controller;

import com.tailor.measurementService.dto.MeasurmentRequestDto;
import com.tailor.measurementService.dto.ResponseDto;
import com.tailor.measurementService.entity.Gender;
import com.tailor.measurementService.entity.Measurement;
import com.tailor.measurementService.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/measurements")
@CrossOrigin("*")
public class MeasurementController {
    @Autowired
    MeasurementService measurementService;

    @PostMapping
    public Measurement saveMeasurement(Measurement measurement){
        System.out.println("Received Measurement: " + measurement);
        return  measurementService.saveMeasurement(measurement);
    }

    @GetMapping("/measurementById/{id}")
    public Measurement getMeasurementById(@PathVariable Long id){
        return  measurementService.getMeasurementById(id);
    }
    @GetMapping("/measurementByUserId/{id}")
    public ResponseDto getMeasurementByUserId(@PathVariable Long id){
        return  measurementService.getMeasurementByUserId(id);
    }

    @PostMapping("/saveMeasurement")
    public Measurement saveMeasurement(@RequestBody MeasurmentRequestDto dto) {
        // Log the incoming DTO
        System.out.println("Received DTO: " + dto);

        // Convert DTO to Entity
        Measurement measurement = new Measurement();
        measurement.setUserId(dto.getUserId());
        measurement.setTailorId(dto.getTailorId());
        measurement.setGender(Gender.valueOf(dto.getGender())); // Convert string to enum
        measurement.setCategory(dto.getCategory());
        measurement.setDesign(dto.getDesign());
        measurement.setMeasurements(dto.getMeasurements());
        measurement.setPrice(dto.getPrice());

        // Log the converted entity
        System.out.println("Converted to Entity: " + measurement);

        // Save and return
        Measurement savedMeasurement = measurementService.saveMeasurement(measurement);
        System.out.println("Saved Entity: " + savedMeasurement);

        return savedMeasurement;
    }
}

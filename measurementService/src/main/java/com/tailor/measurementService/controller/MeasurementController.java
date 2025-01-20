package com.tailor.measurementService.controller;

import com.tailor.measurementService.dto.ResponseDto;
import com.tailor.measurementService.entity.Measurement;
import com.tailor.measurementService.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeasurementController {
    @Autowired
    MeasurementService measurementService;

    @PostMapping
    public Measurement saveMeasurement(Measurement measurement){
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


}

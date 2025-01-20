package com.tailor.measurementService.service;

import com.tailor.measurementService.dto.CustomerDto;
import com.tailor.measurementService.dto.MeasurementDto;
import com.tailor.measurementService.dto.ResponseDto;
import com.tailor.measurementService.entity.Measurement;
import com.tailor.measurementService.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MeasurementService {

    @Autowired
    MeasurementRepository measurementRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public Measurement saveMeasurement(Measurement measurement){
        return measurementRepository.save(measurement);
    }

    public Measurement getMeasurementById(Long id){
        Optional<Measurement> mesurement = measurementRepository.findById(id);
        if(mesurement.isPresent()){
            return  mesurement.get();
        }
        return  null;
    }

    private MeasurementDto mapToMeasurement(Measurement measurement) {
        MeasurementDto dto = new MeasurementDto();
        dto.setMeasurements(measurement.getMeasurements());
        dto.setMeasurement_id(measurement.getMeasurement_id());
        dto.setCategory(measurement.getCategory());
        dto.setDesign(measurement.getDesign());
        dto.setGender(measurement.getGender());
        return dto;
    }

    public ResponseDto getMeasurementByUserId(Long id){
        ResponseDto responseDto = new ResponseDto();
        Measurement measurement = measurementRepository.findByUserId(id);
        MeasurementDto measurementDto = mapToMeasurement(measurement);

        CustomerDto customerDto = webClientBuilder.baseUrl("http://localhost:8082/api")
                .build()
                .get()
                .uri("/users/" + measurement.getUserId())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<CustomerDto>() {})
                .block();

        responseDto.setMeasurementDto(measurementDto);
        responseDto.setCustomerDto(customerDto);

        return responseDto;
    }

}

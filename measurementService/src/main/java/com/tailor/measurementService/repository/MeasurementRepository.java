package com.tailor.measurementService.repository;

import com.tailor.measurementService.entity.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {

    Measurement findByUserId(Long userId);
}

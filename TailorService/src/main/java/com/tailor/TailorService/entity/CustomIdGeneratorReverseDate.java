package com.tailor.TailorService.entity;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicLong;

public class CustomIdGeneratorReverseDate implements IdentifierGenerator {

    private static final AtomicLong counter = new AtomicLong(1);

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        // Get the current date in ddMMyyyy format
        String datePrefix = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));

        // Increment the counter and pad it to ensure fixed length (e.g., 001, 002)
        long idSuffix = counter.getAndIncrement();
        String paddedCounter = String.format("%03d", idSuffix);

        // Concatenate the date and counter
        return Long.parseLong(datePrefix + paddedCounter);
    }
}


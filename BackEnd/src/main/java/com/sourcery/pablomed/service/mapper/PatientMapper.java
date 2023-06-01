package com.sourcery.pablomed.service.mapper;

import com.sourcery.pablomed.dto.PatientDto;
import com.sourcery.pablomed.model.Patient;
import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public static Patient map(PatientDto patientDto) {
        return Patient.builder()
                .firstName(patientDto.getFirstName())
                .lastName(patientDto.getLastName())
                .email(patientDto.getEmail())
                .phoneNumber(patientDto.getPhoneNumber())
                .build();
    }
}

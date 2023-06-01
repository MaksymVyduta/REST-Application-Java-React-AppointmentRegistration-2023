package com.sourcery.pablomed.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentInputData {
    private String loggedInUserEmail;
    private String patientFirstname;
    private String patientLastname;
    private String patientEmail;
    private String patientPhone;
    private UUID doctorUuid;
    private UUID specializationUuid;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}
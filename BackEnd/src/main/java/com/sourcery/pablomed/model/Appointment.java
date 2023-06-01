package com.sourcery.pablomed.model;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Appointment {
    private Long id;
    private Long doctorId;
    private Long specializationId;
    private Long patientId;
    private Long patientSubAccountId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean canceled;
}

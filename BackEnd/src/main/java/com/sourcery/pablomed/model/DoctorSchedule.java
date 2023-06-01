package com.sourcery.pablomed.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorSchedule {
    private UUID doctorUuid;
    private UUID specializationUuid;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}
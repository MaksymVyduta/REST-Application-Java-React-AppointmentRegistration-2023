package com.sourcery.pablomed.dto;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorSpecializationIdDto {
    private Long doctorId;
    private UUID specializationUuid;
}
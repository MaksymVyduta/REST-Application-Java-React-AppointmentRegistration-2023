package com.sourcery.pablomed.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.Duration;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpecializationDto {
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MINUTES")
    private Duration visitTime;
    private UUID uuid;
}

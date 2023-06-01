package com.sourcery.pablomed.model;

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
public class Specialization {

    private Long id;
    private String name;
    private Duration visitTime;
    private UUID uuid;
}

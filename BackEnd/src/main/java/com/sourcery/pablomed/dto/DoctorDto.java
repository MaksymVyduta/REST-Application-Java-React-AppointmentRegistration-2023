package com.sourcery.pablomed.dto;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private String name;
    private UUID uuid;
    private List<UUID> specializationsIds;

}

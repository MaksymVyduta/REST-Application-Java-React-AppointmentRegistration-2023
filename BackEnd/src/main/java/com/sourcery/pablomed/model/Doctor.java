package com.sourcery.pablomed.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    private Long id;
    private String name;
    private UUID uuid;
}

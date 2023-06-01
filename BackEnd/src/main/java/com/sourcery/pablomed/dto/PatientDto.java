package com.sourcery.pablomed.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}

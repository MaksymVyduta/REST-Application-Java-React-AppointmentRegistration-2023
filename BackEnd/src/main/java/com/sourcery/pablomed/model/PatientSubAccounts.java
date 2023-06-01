package com.sourcery.pablomed.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientSubAccounts {

    private Long id;
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    public PatientSubAccounts(Long patientId, String firstName, String lastName, String email, String phoneNumber) {
        this.patientId = patientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}

package com.sourcery.pablomed.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}

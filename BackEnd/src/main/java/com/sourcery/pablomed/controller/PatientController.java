package com.sourcery.pablomed.controller;

import com.sourcery.pablomed.dto.PatientDto;
import com.sourcery.pablomed.model.Patient;
import com.sourcery.pablomed.security.LoggedUserEmailResolver;
import com.sourcery.pablomed.security.UserRole;
import com.sourcery.pablomed.security.UserRoleResolver;
import com.sourcery.pablomed.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/patient")
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public void createPatient(@RequestBody PatientDto patientDto) {
        patientService.insertPatient(patientDto);
    }

    @GetMapping("logged")
    public Patient getLoggedPatientData() {
        UserRole userRole = UserRoleResolver.resolveUserRole();
        if (userRole == UserRole.PATIENT) {
            String patientEmail = LoggedUserEmailResolver.loggedUserEmailResolver();
            return patientService.getLoggedPatientData(patientEmail);
        }
        return null;
    }
}

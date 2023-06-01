package com.sourcery.pablomed.controller;

import com.sourcery.pablomed.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointment")
public class AppointmentCancelingController {

    private final AppointmentService appointmentService;

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

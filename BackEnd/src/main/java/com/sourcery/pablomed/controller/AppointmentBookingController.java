package com.sourcery.pablomed.controller;

import com.sourcery.pablomed.dto.AppointmentInputData;
import com.sourcery.pablomed.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointment")
public class AppointmentBookingController {
    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentInputData appointmentInputData) {
        try {
            appointmentService.insertAppointment(appointmentInputData);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during appointment creation");
        }
    }
}
package com.sourcery.pablomed.controller;

import com.sourcery.pablomed.dto.GetAppointmentDto;
import com.sourcery.pablomed.service.AppointmentService;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;


    @GetMapping
    public List<GetAppointmentDto> getAppointments(
            @RequestParam("doctorUuid") UUID doctorUuid,
            @RequestParam("specializationUuid") UUID specializationUuid,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {
        return appointmentService.getAppointments(doctorUuid,
                            specializationUuid,
                            startDate,
                            endDate);
    }
}


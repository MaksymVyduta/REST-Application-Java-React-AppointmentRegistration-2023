package com.sourcery.pablomed.controller;


import com.sourcery.pablomed.dto.GetAppointmentDto;
import com.sourcery.pablomed.service.AvailableAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/searchAppointment")
public class AvailableAppointmentController {

    private final AvailableAppointmentService availableAppointmentService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<GetAppointmentDto> getAvailableAppointment(
            @RequestParam UUID doctorUuid,
            @RequestParam UUID specializationUuid,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return availableAppointmentService.getAvailableAppointment(doctorUuid, specializationUuid, startDate, endDate);
    }
}

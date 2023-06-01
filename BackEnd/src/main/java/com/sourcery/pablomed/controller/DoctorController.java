package com.sourcery.pablomed.controller;

import com.sourcery.pablomed.dto.DoctorDto;
import com.sourcery.pablomed.service.DoctorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/doctor")
public class DoctorController {

    private final DoctorService doctorService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<DoctorDto> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
}

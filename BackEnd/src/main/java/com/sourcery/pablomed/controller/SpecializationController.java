package com.sourcery.pablomed.controller;

import com.sourcery.pablomed.dto.SpecializationDto;
import com.sourcery.pablomed.service.SpecializationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/specialization")
public class SpecializationController {

    private final SpecializationService specializationService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<SpecializationDto> getAllSpecializations() {
        return specializationService.getAllSpecializations();
    }
}

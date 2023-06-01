package com.sourcery.pablomed.service;

import com.sourcery.pablomed.dto.SpecializationDto;
import com.sourcery.pablomed.repository.SpecializationRepository;
import com.sourcery.pablomed.service.mapper.SpecializationMapper;

import java.time.Duration;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializationService {

    private final SpecializationRepository specializationRepository;

    public List<SpecializationDto> getAllSpecializations() {
        return specializationRepository.getAllSpecializations()
                .stream()
                .map(SpecializationMapper::map)
                .collect(Collectors.toList());
    }

    public Duration getVisitTime(UUID specializationUuid) {
        return specializationRepository.getAllSpecializations()
              .stream()
                .filter(specialization -> specialization.getUuid().equals(specializationUuid))
                .findFirst()
                .map(specialization -> specialization.getVisitTime())
              .orElseThrow();
    }
}

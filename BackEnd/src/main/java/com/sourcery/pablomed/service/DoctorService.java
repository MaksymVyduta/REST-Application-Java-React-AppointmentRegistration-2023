package com.sourcery.pablomed.service;

import com.sourcery.pablomed.dto.DoctorDto;
import com.sourcery.pablomed.dto.DoctorSpecializationIdDto;
import com.sourcery.pablomed.repository.DoctorRepository;
import com.sourcery.pablomed.repository.SpecializationRepository;
import com.sourcery.pablomed.service.mapper.DoctorMapper;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;

    public List<DoctorDto> getAllDoctors() {
        Map<Long, List<UUID>> specializationIdsByDoctorId = specializationRepository
                .getSpecializationsByDoctorIdForAllDoctors()
                .stream()
                .collect(Collectors.groupingBy(
                        DoctorSpecializationIdDto::getDoctorId,
                        Collectors.mapping(DoctorSpecializationIdDto::getSpecializationUuid, Collectors.toList())));
        return doctorRepository.getAllDoctors().stream()
                .map(doctor -> DoctorMapper.map(doctor, specializationIdsByDoctorId.get(doctor.getId())))
                .collect(Collectors.toList());
    }
}
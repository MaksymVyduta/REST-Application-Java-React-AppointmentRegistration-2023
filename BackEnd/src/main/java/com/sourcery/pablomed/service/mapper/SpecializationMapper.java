package com.sourcery.pablomed.service.mapper;

import com.sourcery.pablomed.dto.SpecializationDto;
import com.sourcery.pablomed.model.Specialization;
import org.springframework.stereotype.Component;

@Component
public class SpecializationMapper {

    public static Specialization map(SpecializationDto specializationDto) {
        return Specialization.builder()
                .uuid(specializationDto.getUuid())
                .name(specializationDto.getName())
                .visitTime(specializationDto.getVisitTime())
                .build();
    }

    public static SpecializationDto map(Specialization specialization) {
        return SpecializationDto.builder()
                .uuid(specialization.getUuid())
                .name(specialization.getName())
                .visitTime(specialization.getVisitTime())
                .build();
    }
}

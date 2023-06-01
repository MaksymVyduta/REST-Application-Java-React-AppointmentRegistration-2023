package com.sourcery.pablomed.service.mapper;

import com.sourcery.pablomed.dto.DoctorDto;
import com.sourcery.pablomed.model.Doctor;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public static Doctor map(DoctorDto doctorDto) {
        return Doctor.builder()
                .uuid(doctorDto.getUuid())
                .name(doctorDto.getName())
                .build();
    }

    public static DoctorDto map(Doctor doctor, List<UUID> specializationsIds) {
        return DoctorDto.builder()
                .uuid(doctor.getUuid())
                .name(doctor.getName())
                .specializationsIds(specializationsIds)
                .build();
    }
}

package com.sourcery.pablomed.service.mapper;

import com.sourcery.pablomed.dto.GetAppointmentDto;
import com.sourcery.pablomed.model.Appointment;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public static GetAppointmentDto map(
            Appointment appointment,
            UUID doctorUuid,
            UUID specializationUuid,
            String patientName) {
        return GetAppointmentDto.builder()
                .appointmentId(appointment.getId())
                .doctorUuid(doctorUuid)
                .specializationUuid(specializationUuid)
                .patientName(patientName)
                .patientSubAccountId(appointment.getPatientSubAccountId())
                .date(appointment.getDate())
                .startTime(appointment.getStartTime())
                .endTime(appointment.getEndTime())
                .canceled(appointment.isCanceled())
                .build();
    }

}

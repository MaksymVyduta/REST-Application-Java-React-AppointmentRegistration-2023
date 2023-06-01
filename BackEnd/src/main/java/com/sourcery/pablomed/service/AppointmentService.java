package com.sourcery.pablomed.service;

import com.sourcery.pablomed.dto.AppointmentInputData;
import com.sourcery.pablomed.dto.GetAppointmentDto;
import com.sourcery.pablomed.model.Appointment;
import com.sourcery.pablomed.model.Doctor;
import com.sourcery.pablomed.model.Specialization;
import com.sourcery.pablomed.repository.AppointmentRepository;
import com.sourcery.pablomed.repository.DoctorRepository;
import com.sourcery.pablomed.repository.SpecializationRepository;
import com.sourcery.pablomed.security.UserRole;
import com.sourcery.pablomed.security.UserRoleResolver;
import com.sourcery.pablomed.service.mapper.AppointmentMapper;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final SpecializationRepository specializationRepository;
    private final DoctorRepository doctorRepository;
    private final PatientService patientService;

    private List<Appointment> searchAppointments(UUID doctorUuid,
                                                 UUID specializationUuid,
                                                 String startDate,
                                                 String endDate) {
        UserRole userRole = UserRoleResolver.resolveUserRole();
        String userEmail = String.valueOf(UserRoleResolver.getUserEmail());

        assert userRole != null;
        return switch (userRole) {
            case ADMIN -> appointmentRepository.getAppointments(doctorUuid,
                    specializationUuid,
                    LocalDate.parse(startDate),
                    LocalDate.parse(endDate));
            case PATIENT -> appointmentRepository.getPatientAppointments(doctorUuid,
                    specializationUuid,
                    LocalDate.parse(startDate),
                    LocalDate.parse(endDate),
                    userEmail);
            default -> new ArrayList<>();
        };
    }

    public List<GetAppointmentDto> getAppointments(UUID doctorUuid,
                                                   UUID specializationUuid,
                                                   String startDate,
                                                   String endDate) {
        List<Doctor> doctors = doctorRepository.getAllDoctors();
        List<Specialization> specializations = specializationRepository.getAllSpecializations();

        return searchAppointments(doctorUuid, specializationUuid, startDate, endDate)
                .stream()
                .map(appointment -> {
                    String patientName = Optional.ofNullable(appointment.getPatientSubAccountId())
                            .map(patientService::getPatientNameBySubAccountId)
                            .orElseGet(() -> patientService.getPatientNameById(appointment.getPatientId()));
                    return AppointmentMapper.map(appointment,
                            doctors.stream()
                                    .filter(doctor -> doctor.getId().equals(appointment.getDoctorId()))
                                    .findFirst()
                                    .orElseThrow()
                                    .getUuid(),
                            specializations.stream()
                                    .filter(specialization -> specialization
                                            .getId()
                                            .equals(appointment.getSpecializationId()))
                                    .findFirst()
                                    .orElseThrow()
                                    .getUuid(),
                            patientName);
                })
                .collect(Collectors.toList());

    }

    public List<GetAppointmentDto> getAppointments(UUID doctorUuid,
                                                   String startDate,
                                                   String endDate) {
        List<Doctor> doctors = doctorRepository.getAllDoctors();

        return appointmentRepository.getAppointmentsWithAnySpecialization(doctorUuid,
                            LocalDate.parse(startDate),
                            LocalDate.parse(endDate))
                    .stream()
                    .map(appointment -> AppointmentMapper.map(appointment,
                            doctors.stream()
                                    .filter(doctor -> doctor.getId().equals(appointment.getDoctorId()))
                                    .findFirst()
                                    .orElseThrow()
                                    .getUuid(), null,
                            patientService.getPatientNameById(appointment.getPatientId())))
                    .collect(Collectors.toList());
    }

    @Transactional
    public void insertAppointment(AppointmentInputData appointmentInputData) {
        UUID doctorUuid = appointmentInputData.getDoctorUuid();
        UUID specializationUuid = appointmentInputData.getSpecializationUuid();

        Pair<Long, Long> patientIdPatientSubbAccID = patientService.patientHandler(
                appointmentInputData.getLoggedInUserEmail(),
                appointmentInputData.getPatientFirstname(),
                appointmentInputData.getPatientLastname(),
                appointmentInputData.getPatientEmail(),
                appointmentInputData.getPatientPhone());

        Long doctorId = doctorRepository.getDoctorIdByUuid(doctorUuid);
        Long specializationId = specializationRepository.getSpecializationIdByUuid(specializationUuid);

        if (checkIfDoctorHasSuchSpecialization(doctorId, specializationId)) {
            Appointment appointment = com.sourcery.pablomed.model.Appointment.builder()
                    .doctorId(doctorId)
                    .specializationId(specializationId)
                    .patientId(patientIdPatientSubbAccID.getLeft())
                    .patientSubAccountId(patientIdPatientSubbAccID.getRight())
                    .date(appointmentInputData.getDate())
                    .startTime(appointmentInputData.getStartTime())
                    .endTime(appointmentInputData.getEndTime())
                    .canceled(false)
                    .build();

            if (isAppointmentSlotAvailable(appointment.getDoctorId(), appointment.getDate(),
                    appointment.getStartTime(), appointment.getEndTime())) {

                appointmentRepository.insertAppointment(appointment);
            } else {
                throw new IllegalStateException("The appointment slot is already booked.");
            }
        } else {
            throw new IllegalStateException("The doctor does not have the specified specialization.");
        }
    }

    private boolean isAppointmentSlotAvailable(Long doctorId,
                                                   LocalDate date,
                                                   LocalTime startTime,
                                                   LocalTime endTime) {
        int count = appointmentRepository.countOverlappingAppointments(doctorId, date, startTime, endTime);
        return count == 0;
    }

    private boolean checkIfDoctorHasSuchSpecialization(Long doctorId, Long specializationId) {
        int count = doctorRepository.countDoctorSpecialization(doctorId, specializationId);
        return count > 0;
    }

    public void cancelAppointment(Long id) {
        appointmentRepository.cancelAppointment(id);
    }
}
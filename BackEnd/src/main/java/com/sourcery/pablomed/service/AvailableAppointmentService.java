package com.sourcery.pablomed.service;


import com.sourcery.pablomed.dto.GetAppointmentDto;
import com.sourcery.pablomed.model.DoctorSchedule;

import com.sourcery.pablomed.repository.DoctorScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AvailableAppointmentService {

    public static final int appointmentBookingInterval = 15;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final SpecializationService specializationService;
    private final AppointmentService appointmentService;

    private List<DoctorSchedule> getDoctorsSchedules(UUID doctorUuid,
                                                     LocalDate startingDateOfDoctorsWork,
                                                     LocalDate endingDateOfDoctorsWork) {
        List<DoctorSchedule> doctorSchedule = doctorScheduleRepository.getDoctorSchedule(doctorUuid,
                startingDateOfDoctorsWork,
                endingDateOfDoctorsWork);
        List<LocalDate> searchRangeOfDoctorWorkingDays = doctorSchedule
                .stream()
                .map(DoctorSchedule::getDate)
                .collect(Collectors.toList());

        LocalDate currentDate = startingDateOfDoctorsWork;
        while (!currentDate.isAfter(endingDateOfDoctorsWork)) {
            if (!searchRangeOfDoctorWorkingDays.contains(currentDate)) {
                doctorSchedule.add(new DoctorSchedule(doctorUuid, null, currentDate, null, null));
            }
            currentDate = currentDate.plusDays(1);
        }
        return doctorSchedule;
    }


    public List<GetAppointmentDto> getAvailableAppointment(UUID doctorUuid,
                                                           UUID specializationUuid,
                                                           String startDate,
                                                           String endDate) {


        List<GetAppointmentDto> bookedAppointments = appointmentService.getAppointments(doctorUuid,
                startDate,
                endDate);

        LocalDate startingDateOfDoctorsWork = LocalDate.parse(startDate);
        LocalDate endingDateOfDoctorsWork = LocalDate.parse(endDate);

        List<GetAppointmentDto> availableAppointments = new ArrayList<>();
        List<DoctorSchedule> doctorSchedules = getDoctorsSchedules(doctorUuid,
                startingDateOfDoctorsWork,
                endingDateOfDoctorsWork);


        Duration appointmentDuration = specializationService.getVisitTime(specializationUuid);

        LocalTime timeOfHttpRequest = LocalTime.now();
        LocalDate dateOfHttpRequest = LocalDate.now();

        for (DoctorSchedule doctorSchedule: doctorSchedules) {

            // Checks if there is a schedule for the day. If not, skips to next day
            if (doctorSchedule.getStartTime() != null) {

                for (LocalTime intervalStart = doctorSchedule.getStartTime();
                     !intervalStart.plus(appointmentDuration)
                             .isAfter(doctorSchedule.getEndTime());
                     intervalStart = intervalStart.plusMinutes(appointmentBookingInterval)) {

                    if (intervalStart.isBefore(timeOfHttpRequest)
                            && doctorSchedule.getDate().equals(dateOfHttpRequest)) {
                        continue;
                    }
                    LocalTime slotIntervalStart = intervalStart;
                    LocalTime slotIntervalEnd = intervalStart.plus(appointmentDuration);

                    boolean checkIfAppointmentIsBooked = bookedAppointments.stream()
                            .anyMatch(a ->
                                            a.getStartTime().isBefore(slotIntervalEnd)
                                            && a.getEndTime().isAfter(slotIntervalStart));

                    if (!checkIfAppointmentIsBooked) {
                        GetAppointmentDto appointmentDto = new GetAppointmentDto();
                        appointmentDto.setDoctorUuid(doctorUuid);
                        appointmentDto.setSpecializationUuid(specializationUuid);
                        appointmentDto.setDate(doctorSchedule.getDate());
                        appointmentDto.setStartTime(intervalStart);
                        appointmentDto.setEndTime(intervalStart.plus(appointmentDuration));
                        availableAppointments.add(appointmentDto);
                    }
                }
            }
        }
        return availableAppointments;
    }
}


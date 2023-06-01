package com.sourcery.pablomed.repository;

import com.sourcery.pablomed.model.Appointment;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AppointmentRepository {

    @Select("""
        SELECT a.*
        FROM appointment a
        JOIN doctor d ON a.doctor_id = d.id
        JOIN specialization s ON a.specialization_id = s.id
        AND s.uuid = #{specializationUuid}
        AND d.uuid = #{doctorUuid}
        AND a.date <= #{endDate}
        AND a.date >= #{startDate}
        AND a.canceled = false
        ORDER BY a.date, a.start_time""")
    @Results({
        @Result(column = "doctor_id", property = "doctorId"),
        @Result(column = "specialization_id", property = "specializationId"),
        @Result(column = "start_time", property = "startTime"),
        @Result(column = "end_time", property = "endTime"),
        @Result(column = "patient_id", property = "patientId"),
        @Result(column = "patient_subaccount_id", property = "patientSubAccountId")
    })
    List<Appointment> getAppointments(@Param("doctorUuid") UUID doctorId,
                                      @Param("specializationUuid") UUID specializationUuid,
                                      @Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate);

    @Select("""
        SELECT a.*
        FROM appointment a
        JOIN doctor d ON a.doctor_id = d.id
        JOIN specialization s ON a.specialization_id = s.id
        AND s.uuid = #{specializationUuid}
        AND d.uuid = #{doctorUuid}
        AND a.date <= #{endDate}
        AND a.canceled = false
        JOIN patient p ON p.id = a.patient_id
        WHERE p.email = #{patientEmail}
        ORDER BY a.date, a.start_time""")
    @Results({
        @Result(column = "doctor_id", property = "doctorId"),
        @Result(column = "specialization_id", property = "specializationId"),
        @Result(column = "start_time", property = "startTime"),
        @Result(column = "end_time", property = "endTime"),
        @Result(column = "patient_id", property = "patientId"),
        @Result(column = "patient_subaccount_id", property = "patientSubAccountId")
    })
    List<Appointment> getPatientAppointments(@Param("doctorUuid") UUID doctorId,
                                      @Param("specializationUuid") UUID specializationUuid,
                                      @Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate,
                                      @Param("patientEmail") String userEmail);

    @Select("""
        SELECT a.*
        FROM appointment a
        JOIN doctor d ON a.doctor_id = d.id
        JOIN specialization s ON a.specialization_id = s.id
        WHERE d.uuid = #{doctorUuid}
        AND a.date >= #{startDate}
        AND a.date <= #{endDate}
        AND a.canceled = false""")
    @Results({
        @Result(column = "doctor_id", property = "doctorId"),
        @Result(column = "specialization_id", property = "specializationId"),
        @Result(column = "start_time", property = "startTime"),
        @Result(column = "end_time", property = "endTime"),
        @Result(column = "patient_id", property = "patientId"),
    })
    List<Appointment> getAppointmentsWithAnySpecialization(@Param("doctorUuid") UUID doctorId,
                                                           @Param("startDate") LocalDate startDate,
                                                           @Param("endDate") LocalDate endDate);

    @Insert("INSERT INTO"
            + " appointment (doctor_id, "
            + "specialization_id,"
            + " patient_id,"
            + " patient_subaccount_id,"
            + " date, start_time,"
            + " end_time, canceled) "
            + "VALUES "
            + "(#{doctorId},"
            + " #{specializationId},"
            + " #{patientId},"
            + " #{patientSubAccountId},"
            + " #{date},"
            + " #{startTime}, "
            + "#{endTime}, "
            + "#{canceled})")

    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertAppointment(Appointment appointment);

    @Select("SELECT COUNT(*) FROM appointment "
            + "WHERE doctor_id = #{doctorId} AND date = #{date} "
            + "AND ((start_time <= #{startTime} AND end_time > #{startTime}) OR "
            + "(start_time >= #{startTime} AND start_time < #{endTime}))")
    int countOverlappingAppointments(@Param("doctorId") Long doctorId, @Param("date") LocalDate date,
                                     @Param("startTime") LocalTime startTime, @Param("endTime") LocalTime endTime);

    @Update("UPDATE appointment SET canceled = true WHERE id = #{id}")
    void cancelAppointment(Long id);
}

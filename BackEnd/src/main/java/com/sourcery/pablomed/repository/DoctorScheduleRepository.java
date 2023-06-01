package com.sourcery.pablomed.repository;


import com.sourcery.pablomed.model.DoctorSchedule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Mapper
@Repository
public interface DoctorScheduleRepository {

    @Select("""
            SELECT ds.* , d.uuid
            FROM doctor_schedule ds
            JOIN doctor d ON ds.doctor_id = d.id
            WHERE d.uuid = #{doctorUuid}
            AND ds.date >= #{startDate}
            AND ds.date <= #{endDate}
            ORDER BY date, start_hour""")
    @Results({
        @Result(column = "date", property = "date"),
        @Result(column = "start_hour", property = "startTime"),
        @Result(column = "end_hour", property = "endTime"),
    })
    List<DoctorSchedule> getDoctorSchedule(@Param("doctorUuid") UUID doctorUuid,
                                           @Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);
}
package com.sourcery.pablomed.repository;

import com.sourcery.pablomed.dto.DoctorSpecializationIdDto;
import com.sourcery.pablomed.model.Specialization;
import com.sourcery.pablomed.mybatis.DurationTypeHandler;
import com.sourcery.pablomed.mybatis.UuidTypeHandler;
import java.time.Duration;
import java.util.UUID;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import java.util.List;

@Mapper
@Repository
public interface SpecializationRepository {

    @Select("SELECT * FROM specialization")
    @Results({
        @Result(column = "visit_time", property = "visitTime",
                javaType = Duration.class, typeHandler = DurationTypeHandler.class),
        @Result(column = "uuid", property = "uuid", javaType = UUID.class, typeHandler = UuidTypeHandler.class)
    })
    List<Specialization> getAllSpecializations();

    @Select("""
            SELECT ds.doctor_id, s.uuid
            FROM doctor_specialization ds
            JOIN specialization s ON ds.specialization_id = s.id""")
    @Results({
        @Result(column = "doctor_id", property = "doctorId"),
        @Result(column = "uuid", property = "specializationUuid",
                javaType = UUID.class, typeHandler = UuidTypeHandler.class)
    })
    List<DoctorSpecializationIdDto> getSpecializationsByDoctorIdForAllDoctors();

    @Select("SELECT id FROM specialization WHERE uuid = #{specializationUuid}")
    Long getSpecializationIdByUuid(@Param("specializationUuid") UUID specializationUuid);
}


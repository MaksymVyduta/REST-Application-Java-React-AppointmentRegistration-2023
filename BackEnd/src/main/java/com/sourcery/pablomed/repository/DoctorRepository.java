package com.sourcery.pablomed.repository;

import com.sourcery.pablomed.model.Doctor;
import com.sourcery.pablomed.mybatis.UuidTypeHandler;
import java.util.List;
import java.util.UUID;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DoctorRepository {

    @Select("SELECT *  FROM doctor")
    @Result(column = "uuid", property = "uuid", javaType = UUID.class, typeHandler = UuidTypeHandler.class)
    List<Doctor> getAllDoctors();

    @Select("SELECT COUNT(*) FROM doctor_specialization "
            + "WHERE doctor_id = #{doctorId} AND specialization_id = #{specializationId}")
    int countDoctorSpecialization(@Param("doctorId") Long doctorId, @Param("specializationId") Long specializationId);

    @Select("SELECT id FROM doctor WHERE uuid = #{doctorUuid}")
    Long getDoctorIdByUuid(@Param("doctorUuid") UUID doctorUuid);
}

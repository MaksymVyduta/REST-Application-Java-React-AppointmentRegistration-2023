package com.sourcery.pablomed.repository;

import com.sourcery.pablomed.model.Patient;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PatientRepository {
    @Select("SELECT id, first_name as firstName, last_name as lastName, email, phone_number as phoneNumber "
            + "FROM patient WHERE email = #{email}")


    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "firstName", column = "firstName"),
        @Result(property = "lastName", column = "lastName"),
        @Result(property = "email", column = "email"),
        @Result(property = "phoneNumber", column = "phoneNumber")
    })
    Patient findByEmail(String email);

    @Insert("""
            INSERT INTO patient (first_name, last_name, email, phone_number)
            VALUES (#{firstName}, #{lastName}, #{email}, #{phoneNumber})""")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertPatient(Patient patient);

    @Select("""
            SELECT p.* FROM patient p
            JOIN appointment a ON p.id = a.patient_id
            JOIN patient_sub_accounts psa ON a.patient_subaccount_id = psa.id
            WHERE psa.email = #{subAccountEmail}
            ORDER BY a.id DESC
            LIMIT 1
            """)
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "firstName", column = "first_name"),
        @Result(property = "lastName", column = "last_name"),
        @Result(property = "email", column = "email"),
        @Result(property = "phoneNumber", column = "phone_number")
    })
    Patient getPatientBySubAccountEmail(String subAccountEmail);

    @Select("""
            SELECT * FROM patient
            WHERE id = #{patientId}
            """)
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "firstName", column = "first_name"),
        @Result(property = "lastName", column = "last_name"),
        @Result(property = "email", column = "email"),
        @Result(property = "phoneNumber", column = "phone_number")
    })
    Patient getPatientById(Long patientId);
}

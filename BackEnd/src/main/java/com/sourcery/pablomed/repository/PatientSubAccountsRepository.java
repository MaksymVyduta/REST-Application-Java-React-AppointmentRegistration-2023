package com.sourcery.pablomed.repository;

import com.sourcery.pablomed.model.PatientSubAccounts;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Options;
import org.springframework.stereotype.Repository;
import java.util.List;

@Mapper
@Repository
public interface PatientSubAccountsRepository {
    @Select("SELECT * FROM patient_sub_accounts WHERE patient_id = #{patientId}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "patientId", column = "patient_id"),
        @Result(property = "firstName", column = "first_name"),
        @Result(property = "lastName", column = "last_name"),
        @Result(property = "email", column = "email"),
        @Result(property = "phoneNumber", column = "phone_number")
    })
    List<PatientSubAccounts> findByPatientAccount(@Param("patientId") Long patientId);


    @Insert("INSERT INTO patient_sub_accounts (patient_id, first_name, last_name, email, phone_number)"
        + " VALUES (#{patientId}, #{firstName}, #{lastName}, #{email}, #{phoneNumber})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertNewSubAccount(PatientSubAccounts patientSubAccount);

    @Select("SELECT * FROM patient_sub_accounts WHERE id = #{id}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "patientId", column = "patient_id"),
        @Result(property = "firstName", column = "first_name"),
        @Result(property = "lastName", column = "last_name"),
        @Result(property = "email", column = "email"),
        @Result(property = "phoneNumber", column = "phone_number")
    })
    PatientSubAccounts findById(@Param("id") Long id);
}

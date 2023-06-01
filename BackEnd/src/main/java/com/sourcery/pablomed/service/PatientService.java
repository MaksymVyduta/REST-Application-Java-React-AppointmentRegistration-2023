package com.sourcery.pablomed.service;

import com.sourcery.pablomed.dto.PatientDto;
import com.sourcery.pablomed.model.Patient;
import com.sourcery.pablomed.model.PatientSubAccounts;
import com.sourcery.pablomed.repository.PatientRepository;
import com.sourcery.pablomed.repository.PatientSubAccountsRepository;
import com.sourcery.pablomed.security.UserRole;
import com.sourcery.pablomed.security.UserRoleResolver;
import com.sourcery.pablomed.service.mapper.PatientMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientSubAccountsRepository patientSubAccountRepository;
    private final PatientRepository patientRepository;

    @Transactional
    public Pair<Long, Long> patientHandler(String loggedInUserEmail, String patientFirstName, String patientLastName,
                                           String patientEmail, String patientPhone) {
        UserRole userRole = UserRoleResolver.resolveUserRole();

        if (userRole == UserRole.ADMIN) {
            loggedInUserEmail = findPatientForAdmin(patientEmail, loggedInUserEmail);
        }

        Patient patient = patientRepository.findByEmail(loggedInUserEmail);
        List<PatientSubAccounts> subaccounts = patientSubAccountRepository.findByPatientAccount(patient.getId());
        Long subAccountId = null;

        if (patient.getFirstName().equals(patientFirstName)
                && patient.getLastName().equals(patientLastName)
                && patient.getPhoneNumber().equals(patientPhone)) {
            return Pair.of(patient.getId(), null);
        } else {
            for (PatientSubAccounts subaccount:subaccounts) {
                if (subaccount.getEmail().equals(patientEmail)
                        && subaccount.getFirstName().equals(patientFirstName)
                        && subaccount.getLastName().equals(patientLastName)
                        && subaccount.getPhoneNumber().equals(patientPhone)) {
                    subAccountId = subaccount.getId();
                    break;
                }
            }
            if (subAccountId != null) {
                return Pair.of(patient.getId(), subAccountId);
            } else {
                PatientSubAccounts newSubAccount = new PatientSubAccounts(patient.getId(), patientFirstName,
                        patientLastName, patientEmail, patientPhone);
                patientSubAccountRepository.insertNewSubAccount(newSubAccount);
                return Pair.of(patient.getId(), newSubAccount.getId());
            }
        }
    }

    public void insertPatient(PatientDto patientDto) {
        Patient patient = PatientMapper.map(patientDto);
        if (patientRepository.findByEmail(patient.getEmail()) == null) {
            patientRepository.insertPatient(patient);
        }
    }

    public String findPatientForAdmin(String patientEmail, String loggedInUserEmail) {
        Patient patient = patientRepository.findByEmail(patientEmail);
        if (patient != null) {
            return patient.getEmail();
        } else {
            patient = patientRepository.getPatientBySubAccountEmail(patientEmail);
            if (patient != null) {
                return patient.getEmail();
            }
        }

        return loggedInUserEmail;
    }

    public String getPatientNameById(Long patientId) {
        Patient patient = patientRepository.getPatientById(patientId);
        return patient.getFirstName() + " " + patient.getLastName();
    }

    public Patient getLoggedPatientData(String patientEmail) {
        return patientRepository.findByEmail(patientEmail);
    }

    public String getPatientNameBySubAccountId(Long subAccountId) {
        PatientSubAccounts subAccount = patientSubAccountRepository.findById(subAccountId);
        return subAccount.getFirstName() + " " + subAccount.getLastName();
    }
}



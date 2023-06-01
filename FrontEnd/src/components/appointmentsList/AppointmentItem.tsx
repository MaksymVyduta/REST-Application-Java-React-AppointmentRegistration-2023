import React from 'react';
import {Divider, ListItem, ListItemText} from '@mui/material';
import AppointmentButton from './AppointmentButton';
import {AppointmentListItem} from '../../features/appointment/appointmentReducer';
import {useAppSelector} from "../../app/hooks";
import {selectAllDoctors} from "../../features/doctor/doctorSlice";
import {selectAllSpecializations} from "../../features/specialization/specializationSlice";

const AppointmentItem: React.FC<AppointmentListItem> = ({date, startTime, day, doctorUuid, specializationUuid, state, patientName, appointmentId, endTime}) => {
    const doctors = useAppSelector(selectAllDoctors);
    const specializations = useAppSelector(selectAllSpecializations);
    const doctorName = doctors
        .filter(doctor => doctor.uuid === doctorUuid)
        .map(doctor => doctor.name).toString();
    const specializationName = specializations
        .filter(spec => spec.uuid === specializationUuid)
        .map(spec => spec.name).toString();

    return (
        <ListItem alignItems='flex-start'>
            <div className="appointment">
                <div className="date-time">{date.toString()} ({day}) {startTime}</div>
                <Divider variant="fullWidth"></Divider>
                <div className="book-appointment" style={{display: "flex"}}>
                    <div className="doctor-name">
                        <ListItemText  primary={doctorName} secondary={specializationName}></ListItemText>
                    </div>
                    {state === 'booked' &&
                        <ListItemText  primary={`Patient: ${patientName}`}></ListItemText>
                    }
                    <AppointmentButton appointmentDetails={{
                        date, startTime, patientName, appointmentId, day, doctorUuid, specializationUuid, state, endTime}} />

                </div>
            </div>
        </ListItem>
    );
};

export default AppointmentItem;



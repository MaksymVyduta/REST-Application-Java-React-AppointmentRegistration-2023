import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import './AppointmentsList.css';
import {useAppSelector} from "../../app/hooks";
import AppointmentItem from "./AppointmentItem";
import {selectAppointmentsList} from "../../features/appointment/appointmentReducer";
import Paper from "@mui/material/Paper";


export default function AppointmentsList() {

    const[searchParams, setSearchParams] = useState<string>("");

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.delete("state");
        setSearchParams(urlSearchParams.toString());
    });

    const availableAppointments = useAppSelector(selectAppointmentsList);
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const state = new URLSearchParams(window.location.search).get("state") || "new-appointment";

    return (
        <div className='appointments-list'>
            {
                searchParams?.length > 0 &&
                <header>Available appointments: {availableAppointments?.length}</header>
            }
            <List>
                {availableAppointments?.slice(0, 100).map((appointment, idx) => (
                    <Paper key={idx} style={{backgroundColor: '#f2f6fc', marginBottom: '10px'}}>
                        <AppointmentItem
                            key={idx}
                            date={appointment.date}
                            doctorUuid={appointment.doctorUuid}
                            specializationUuid={appointment.specializationUuid}
                            startTime={appointment.startTime}
                            endTime={appointment.endTime}
                            day={dayOfWeek[new Date(appointment.date).getDay()]}
                            patientName={appointment.patientName}
                            appointmentId={appointment.appointmentId}
                            state= {state}/>
                    </Paper>
                ))}
            </List>
        </div>
    );
}
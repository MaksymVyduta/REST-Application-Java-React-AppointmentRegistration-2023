import React, {useState} from 'react';
import {Copyright} from "../components/copyright/Copyright";
import {Navbar} from "../components/navbar/Navbar";
import {AppointmentSearch, AppointmentSearchProps} from "../components/newAppointment/AppointmentSearch";
import AppointmentsList from '../components/appointmentsList/AppointmentsList';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {AppointmentSearchFormValue, clearData, fetchAppointments} from "../features/appointment/appointmentReducer";
import {useLocation} from "react-router-dom";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import {selectLoggedUser} from "../features/security/securityReducer";


export function AppointmentSearchPage() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [focusVisible, setFocusVisible] = useState<string>("");
    const token = useAppSelector(selectLoggedUser);
    const [params, setParams] = React.useState<AppointmentSearchProps>({
        doctorUuid: null,
        specializationUuid: null,
        startDay: null,
        endDay: null,
    }
    );


    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const paramsValues: AppointmentSearchFormValue = {
            specializationUuid: params.specializationUuid,
            doctorUuid: params.doctorUuid,
            startDate: params.startDate,
            endDate: params.endDate,
            state: params.state,
        };

        const appointmentSearchProps: AppointmentSearchProps = {
            doctorUuid: params.doctorUuid || null,
            specializationUuid: params.specializationUuid || null,
            startDay: params.startDate?.length > 1 ? dayjs(params.startDate) : null,
            endDay: params.endDate?.length > 1 ? dayjs(params.endDate) : null,
        };

        setParams(appointmentSearchProps);


        setFocusVisible(params.state === "booked" ? params.state : "new-appointment");

        if (Object.keys(params).length > 1) {
            dispatch(fetchAppointments(paramsValues));
        } else {
            dispatch(clearData());
        }
    }, [dispatch, location, token]);

    return (
        <div>
            <Navbar page={focusVisible}/>
            <Paper style={{padding: '1px 20px', width: '65vw', margin: '25px auto'}}>
                <AppointmentSearch specializationUuid={params.specializationUuid} doctorUuid={params.doctorUuid}
                    startDay={params.startDay} endDay={params.endDay}/>
                <AppointmentsList/>
            </Paper>
            <Copyright/>
        </div>
    );
}
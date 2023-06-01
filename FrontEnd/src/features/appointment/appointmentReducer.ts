import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {selectLoggedUser} from "../security/securityReducer";

export interface AppointmentSearchFormValue {
    doctorUuid: string;
    specializationUuid: string;
    startDate: string;
    endDate: string;
    state: string;
}

export interface AppointmentListItem {
    date: string;
    startTime: string;
    endTime: string;
    day: string;
    doctorUuid: string;
    specializationUuid: string;
    state: string;
    patientName?: string;
    appointmentId: number | null;
}

export interface AppointmentList {
    items: AppointmentListItem[];
    loading: boolean;
}

export interface AppointmentState {
    appointmentsSearchFormValue?: AppointmentSearchFormValue | null;
    appointmentsList: AppointmentList;
    status: 'idle' | 'loading' | 'fulfilled' | 'failed';
    error: string | undefined;
}

const initialState: AppointmentState = {
    appointmentsSearchFormValue: null,
    appointmentsList: {
        items: [],
        loading: false,
    },
    status: 'idle',
    error: undefined,
};

export const fetchAppointments = createAsyncThunk(
    'appointment/fetchBookedAppointments',
    async (params: AppointmentSearchFormValue, {getState} ) => {
        const token = selectLoggedUser(getState() as RootState);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        if (params.state === "booked" && token) {
         
            return (await axios.get(`${process.env.REACT_APP_API_URL}api/v1/appointment`, { params, headers })).data;
        } else if (params.state !== "booked") {

            return (await axios.get(`${process.env.REACT_APP_API_URL}api/v1/searchAppointment`, { params })).data;
        }
        return null;
    }
);
export const appointmentReducer = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        clearData: (state) => {
            state.appointmentsList.items = [];
            state.status = 'idle';
            state.error = undefined;
            state.appointmentsSearchFormValue = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.appointmentsList.items = action.payload;
                state.appointmentsSearchFormValue = action.meta.arg;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAppointmentsList = (state: RootState) => state.appointment.appointmentsList.items;
export const clearData = appointmentReducer.actions.clearData;
export default appointmentReducer.reducer;
import axios from 'axios';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface Doctor  {
    uuid: string;
    name: string;
    specializationsIds: string[];
}

export interface DoctorState {
    doctors: Doctor[],
    status: 'idle' | 'loading' | 'fulfilled' | 'failed',
    error: string | undefined
}

const initialState: DoctorState = {
    doctors: [],
    status: 'idle',
    error: undefined
};

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
    return (await axios.get(`${process.env.REACT_APP_API_URL}api/v1/doctor`)).data;
});

export const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllDoctors = (state: RootState) => state.doctor.doctors;
export default doctorSlice.reducer;

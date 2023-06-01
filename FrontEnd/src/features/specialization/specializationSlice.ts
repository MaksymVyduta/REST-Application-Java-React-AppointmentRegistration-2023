import axios from 'axios';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface Specialization  {
    uuid: string;
    name: string;
    visitTime: number;
}

export interface SpecializationState {
    specializations: Specialization[],
    status: 'idle' | 'loading' | 'fulfilled' | 'failed',
    error: string | undefined
}

const initialState: SpecializationState = {
    specializations: [],
    status: 'idle',
    error: undefined
};

export const fetchSpecializations = createAsyncThunk(
    'specializations/fetchSpecializations',
    async () => {
        return (await axios.get(`${process.env.REACT_APP_API_URL}api/v1/specialization`)).data;
    });

export const specializationSlice = createSlice({
    name: 'specializations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSpecializations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpecializations.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.specializations = action.payload;
            })
            .addCase(fetchSpecializations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllSpecializations = (state: RootState) => state.specialization.specializations;
export default specializationSlice.reducer;

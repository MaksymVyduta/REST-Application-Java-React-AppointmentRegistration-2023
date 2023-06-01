import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import securityReducer from '../features/security/securityReducer';
import appointmentReducer from '../features/appointment/appointmentReducer';
import counterReducer from "../features/counter/counterSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import specializationReducer from "../features/specialization/specializationSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        security: securityReducer,
        appointment: appointmentReducer,
        specialization: specializationReducer,
        doctor: doctorReducer,
    }});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

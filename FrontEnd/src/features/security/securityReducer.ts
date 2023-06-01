import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AppDispatch } from '../../app/store';

export interface LoggedUser {
  tokenAuth0: string;
}

export interface SecurityState {
  loggedUser?: LoggedUser;
}

const initialState: SecurityState = {
    loggedUser: undefined,
};

export const securityReducer = createSlice({
    name: 'security',
    initialState,
    reducers: {
        logout: (state) => {
            sessionStorage.setItem('isUserLogged', 'false');
            state.loggedUser = undefined;
        },
        loginUser: (state, action) => {
            sessionStorage.setItem('isUserLogged', 'true');
            state.loggedUser = {
                tokenAuth0: action.payload,
            };
        },
        initializeSecurity: (state) => {
            if (sessionStorage.getItem('isUserLogged') === 'true') {
                const token = sessionStorage.getItem('tokenAuth0') || '';
                state.loggedUser = {
                    tokenAuth0: token,
                };
            }
        },
    },
});

export default securityReducer.reducer;
export const { logout, loginUser, initializeSecurity } = securityReducer.actions;

export const selectLoggedUser = (state: RootState): string | undefined => state.security.loggedUser?.tokenAuth0;

export const loginAsync = (token: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(loginUser(token));
        sessionStorage.setItem('tokenAuth0', token);
    };
};

export const logoutAsync = () => {
    return (dispatch: AppDispatch) => {
        dispatch(logout());
        sessionStorage.setItem('isUserLogged', 'false');
        sessionStorage.removeItem('tokenAuth0');
    };
};
import React, {useEffect} from 'react';
import './App.css';
import SignUpPage from "./pages/SignUpPage";
import {LoginPage} from "./pages/LoginPage";
import {AppointmentBookingPage} from "./pages/AppointmentBookingPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "./routes/routes";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AppointmentSearchPage} from './pages/AppointmentSearchPage';
import {fetchSpecializations} from "./features/specialization/specializationSlice";
import {fetchDoctors} from "./features/doctor/doctorSlice";
import {useAppDispatch} from "./app/hooks";
import {LinearProgress} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import {initializeSecurity, loginUser} from './features/security/securityReducer';


const theme = createTheme(
    // Here, we can create a theme, which can be used throughout the app. 
    //For example, we can create the same style for submit buttons across the app.
);

function App() {
   
    const dispatch = useAppDispatch();
    const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();


    useEffect(() => {
        dispatch(fetchSpecializations());
        dispatch(fetchDoctors());
        dispatch(initializeSecurity());
    }, [dispatch]);

    useEffect(() => {
        const fetchToken = async () => {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                dispatch(loginUser(token));
            }
        };
        fetchToken();
    }, [isAuthenticated, getAccessTokenSilently, dispatch]);

    return isLoading ? <LinearProgress /> : (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                    <Route path={ROUTES.APPOINTMENT_SEARCH} element={<AppointmentSearchPage />} />
                    <Route path={ROUTES.APPOINTMENT_BOOKING_PAGE} element={<AppointmentBookingPage />} />
                    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.APPOINTMENT_SEARCH} />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
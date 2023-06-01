import * as React from 'react';
import {useState} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import DetailsForm from './AppointmentDetails';
import Summary from './Summary';
import {Navbar} from '../components/navbar/Navbar';
import AppointmentBookSuccessView from './AppointmentBookSuccessView';
import AppointmentBookFailView from './AppointmentBookFailView';
import axios, { AxiosResponse } from 'axios';
import LoadingView from '../components/LoadingView/LoadingView';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../features/security/securityReducer';

const STEPS = ['Appointment details', 'Confirmation'];

export type AppointmentBookingFormValue = {
  patientFirstname: string,
  patientLastname: string,
  patientEmail: string,
  patientPhone: string,
  loggedInUserEmail: string,
  doctorUuid: string,
  specializationUuid: string,
  date: string,
  startTime: string,
  endTime: string,
  day: string,
}

export function AppointmentBookingPage() {
    const { user, isAuthenticated, loginWithRedirect} = useAuth0();
    const loggedInUserEmail: string = user?.email ? user.email : 'Not logged';
    const [isStepValid, setIsStepValid] = React.useState(false);
    const [isAppointmentCreated, setIsAppointmentCreated] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(selectLoggedUser);
    const location = useLocation();

    const [loggedPatientData, setLoggedPatientData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    React.useEffect(() => {
        fetchData();
    }, [token]);
    const fetchData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const response = (await axios.get(`${process.env.REACT_APP_API_URL}api/v1/patient/logged`, {headers})).data;
            setLoggedPatientData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [appointmentBookingFormValue, setAppointmentBookingFormValue] = useState<AppointmentBookingFormValue>({
        loggedInUserEmail: loggedInUserEmail,
        patientFirstname: '',
        patientLastname: '',
        patientEmail: '',
        patientPhone: '',
        doctorUuid: '',
        specializationUuid: '',
        date: '',
        startTime: '',
        endTime: '',
        day: '',
    });


    const sendAppointmentData = async () => {
        const updatedAppointmentBookingFormValue = {
            ...appointmentBookingFormValue,
            loggedInUserEmail: loggedInUserEmail
        };
        try {
            setIsLoading(true);
            const response: AxiosResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}api/v1/appointment`,
                updatedAppointmentBookingFormValue,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
      
            if (response.status) {
                setIsAppointmentCreated(true);
                setIsLoading(false);
            } else {
                setIsAppointmentCreated(false);
                setIsLoading(false);
            }
        } catch (error) {
            setIsAppointmentCreated(false);
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
 
        setAppointmentBookingFormValue({
            ...appointmentBookingFormValue,
            patientFirstname: params.patientFirstname ? params.patientFirstname : loggedPatientData.firstName,
            patientLastname: params.patientLastname ? params.patientLastname : loggedPatientData.lastName,
            patientEmail: params.patientEmail ? params.patientEmail : loggedPatientData.email,
            patientPhone: params.patientPhone ? params.patientPhone : loggedPatientData.phoneNumber,
        });
    }, [loggedPatientData]);

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const newParams = {
            ...params,
            loggedInUserEmail: loggedInUserEmail ? loggedInUserEmail : 'Not logged',
        };
        const newSearchParams = new URLSearchParams(newParams).toString();
        const newUrl = `${location.pathname}?${newSearchParams}`;
        history.pushState(null, '', newUrl);
    }, [isAuthenticated]);


    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        setAppointmentBookingFormValue((prevState) => ({
            ...prevState,
            ...params,
        }));
        location.search.includes('isStepValid=true') && setIsStepValid(params.isStepValid === 'true');
        location.search.includes('activeStep') && setActiveStep(parseInt(params.activeStep));
    }, [location]);


    function getStepContent(step: number) {
        switch (step) {
        case 0:
            return;
        case 1:
            return;
        default:
            throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        const newSearchParams = new URLSearchParams();
        const updatedAppointmentBookingFormValue = {
            ...appointmentBookingFormValue,
            loggedInUserEmail: loggedInUserEmail
        };

        Object.entries(updatedAppointmentBookingFormValue).forEach(([key, value]) => {
            newSearchParams.append(key, value);
        });
        newSearchParams.append('isStepValid', isStepValid.toString());

        if (activeStep === STEPS.length - 1) {
            if (isAuthenticated) {
                newSearchParams.append('activeStep', (activeStep + 1).toString());
                history.replaceState(null, '', `${location.pathname}?${newSearchParams.toString()}`);
                setActiveStep(activeStep + 1);
                sendAppointmentData().then();
            } else {
                newSearchParams.append('activeStep', (activeStep).toString());
                history.replaceState(null, '', `${location.pathname}?${newSearchParams.toString()}`);
                localStorage.setItem('previousPath', `${window.location.pathname}${window.location.search}`);
                loginWithRedirect().then();
            }
        } else {
            newSearchParams.append('activeStep', (activeStep + 1).toString());
            history.replaceState(null, '', `${location.pathname}?${newSearchParams.toString()}`);
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('activeStep', (activeStep - 1).toString());
        const newUrlSearchParams = `${location.pathname}?${searchParams.toString()}`;
        history.replaceState(null, '', newUrlSearchParams);
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar page={"new-appointment"}/>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Appointment Booking
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 && <DetailsForm formValue={appointmentBookingFormValue} setFormValue={setAppointmentBookingFormValue} isStepValid={isStepValid} setIsStepValid={setIsStepValid}/>}
                    {activeStep === 1 && <Summary formValue={appointmentBookingFormValue} setFormValue={setAppointmentBookingFormValue} isStepValid={isStepValid} setIsStepValid={setIsStepValid}/>}
                    {activeStep === 2 && isLoading && <LoadingView />}
                    {activeStep === 2  && !isLoading && isAppointmentCreated && (
                        <AppointmentBookSuccessView
                            formValue={appointmentBookingFormValue}
                            setFormValue={setAppointmentBookingFormValue}
                            isStepValid={isStepValid}
                            setIsStepValid={setIsStepValid}
                        />
                    )}
                    {activeStep === 2 && !isLoading && !isAppointmentCreated && (
                        <AppointmentBookFailView />
                    )}
                    <React.Fragment>
                        <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                            {activeStep <= getStepContent.length && activeStep > 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            {activeStep == 0 && (
                                <Button sx={{ mt: 3, ml: 1 }}>
                                    <Link style={{ textDecoration: 'none' }} component={RouterLink} to="/">
                                        Cancel
                                    </Link>
                                </Button>
                            )}
                            {activeStep <= getStepContent.length && (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!isStepValid}
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1  }}
                                >
                                    {activeStep === STEPS.length - 1 ? 'BOOK APPOINTMENT' : 'Next'}
                                </Button>
                            )}
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

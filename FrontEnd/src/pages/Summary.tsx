import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Patient } from './AppointmentDetails';
import {useAppSelector} from "../app/hooks";
import {selectAllDoctors} from "../features/doctor/doctorSlice";
import {selectAllSpecializations} from "../features/specialization/specializationSlice";

const Summary: React.FC<Patient> = ({formValue}) =>{

    const doctors = useAppSelector(selectAllDoctors);
    const specializations = useAppSelector(selectAllSpecializations);
    const doctorName = doctors
        .filter(doctor => doctor.uuid === formValue.doctorUuid)
        .map(doctor => doctor.name).toString();
    const specializationName = specializations
        .filter(spec => spec.uuid === formValue.specializationUuid)
        .map(spec => spec.name).toString();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom align="center" >
        Check your details:
            </Typography>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>First Name:{<br></br>}{formValue.patientFirstname}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Last Name: {<br></br>}{formValue.patientLastname}</Typography>
                </Grid>
        
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Email: {<br></br>}{formValue.patientEmail}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Mobile: {<br></br>}{formValue.patientPhone}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Appointment Time:
                    </Typography>
                    <Typography gutterBottom>{formValue.date + " " + formValue.day}</Typography>
                    <Typography gutterBottom>Time: {formValue.startTime}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Your Doctor: 
                    </Typography>
                    <Typography gutterBottom>{doctorName}</Typography>
                    <Typography gutterBottom>{specializationName}</Typography>
                </Grid>
            </Grid>
            <br></br>
        </React.Fragment>
    );
};

export default Summary;
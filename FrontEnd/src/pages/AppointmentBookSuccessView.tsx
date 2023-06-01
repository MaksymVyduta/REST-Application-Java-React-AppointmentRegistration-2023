import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {Patient} from "./AppointmentDetails";
import { useSelector } from 'react-redux';
import { selectAllDoctors } from '../features/doctor/doctorSlice';
import { selectAllSpecializations } from '../features/specialization/specializationSlice';

const AppointmentBookSuccessView: React.FC<Patient> = ({formValue}) =>{
    const doctors = useSelector(selectAllDoctors);
    const doctorName = doctors.find(doctor => doctor.uuid === formValue.doctorUuid)?.name;
    const specializations = useSelector(selectAllSpecializations);
    const specializationName = specializations.find(specialization => specialization.uuid === formValue.specializationUuid)?.name;
    
    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom color='#00D100' align="center" >
     APPOINTMENT SUCCESSFULLY BOOKED
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
                <br></br>
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
            <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                <Button sx={{ mt: 3, ml: 1 }} variant="contained" type="submit">
                    <Link style={{ textDecoration: 'none' }} color="inherit" component={RouterLink} to="/">
                    BOOK ANOTHER APPOINTMENT
                    </Link>
                </Button>
            </Box>
            <br></br>
        </React.Fragment>
    );
};

export default AppointmentBookSuccessView;
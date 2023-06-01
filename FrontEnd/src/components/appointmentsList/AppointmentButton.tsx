import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import {AppointmentListItem} from '../../features/appointment/appointmentReducer';
import {ROUTES} from "../../routes/routes";
import {useLocation} from "react-router-dom";
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../features/security/securityReducer';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type Props = {
    appointmentDetails: AppointmentListItem
}

const AppointmentButton: React.FC<Props> = ({ appointmentDetails }) => {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const state = params.state;

    const handleBookButtonClick = () => {
        const bookAppointmentDetails = {
            date: appointmentDetails.date,
            startTime: appointmentDetails.startTime,
            endTime: appointmentDetails.endTime,
            day: appointmentDetails.day,
            doctorUuid: appointmentDetails.doctorUuid,
            specializationUuid: appointmentDetails.specializationUuid
        };

        const searchParams = new URLSearchParams(bookAppointmentDetails);
        const search = searchParams.toString();

        window.location.href = `${ROUTES.APPOINTMENT_BOOKING_PAGE}?${search}`;
    };

    const [open, setOpen] = useState<boolean>(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const token = useSelector(selectLoggedUser);

    function cancelAppointment() {
        axios.delete(`${process.env.REACT_APP_API_URL}api/v1/appointment/cancel/${appointmentDetails.appointmentId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                console.log(response.data);
            });
        window.location.replace(window.location.pathname + window.location.search);
    }

    function handleButtonClick() {
        handleClose();
        cancelAppointment();
        localStorage.setItem('showSnackbar', 'true');
    }    

    useEffect(() => {
        const showSnackbar = localStorage.getItem('showSnackbar');  
        if (showSnackbar === 'true') {
            handleClickSnack();
            localStorage.removeItem('showSnackbar');
        }
    }, []);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
      
    const [openSnack, setOpenSnack] = React.useState(false);
      
    const handleClickSnack = () => {
        setOpenSnack(true);
    };
      
    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    return (
        <div className="appointment-button">
            {state !== 'booked' &&
                <Button className="book-appointment-button" variant="contained" onClick={handleBookButtonClick}>
                    Book Appointment
                </Button>
            }
            {state === 'booked' && (
                <>
                    <Button className='book-appointment-button' variant='contained' onClick={handleClickOpen}>
                        Cancel
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}>
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to cancel appointment?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={handleButtonClick}>Yes</Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                        Appointment successfully cancelled!
                        </Alert>
                    </Snackbar>
                </>
            )}
        </div>
    );
};

export default AppointmentButton;
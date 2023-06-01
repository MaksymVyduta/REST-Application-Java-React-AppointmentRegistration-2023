import * as React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {ROUTES} from "../../routes/routes";
import {Link} from "react-router-dom";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useAuth0} from '@auth0/auth0-react';
import {useAppDispatch} from "../../app/hooks";
import {clearData} from "../../features/appointment/appointmentReducer";
import Avatar from "@mui/material/Avatar";

export interface NavbarProps {
    page: string;
}


export function Navbar(props: NavbarProps) {

    const { page } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [focusVisible, setFocusVisible] = useState<string>("");

    useEffect(() => {
        setFocusVisible(page);
    }, );

    const styles = {
        root: {
            position: 'static'
        },
        container: {
            maxWidth: "xl",
        },
        buttonsBox: {
            flexGrow: 1,
        },
        buttonsBooked: {
            my: 2,
            color: 'white',
            display: 'block',
            Link: {
                color: 'white',
                textDecoration: 'none'
            },
            background: focusVisible === 'booked' ? '#42a5f5' : '#1976d2',
            marginLeft: '20px'
        },
        buttonsNewAppointment: {
            my: 2,
            color: 'white',
            display: 'block',
            Link: {
                color: 'white',
                textDecoration: 'none'
            },
            background: focusVisible === 'new-appointment' ? '#42a5f5' : '#1976d2',
        },
        loginButton: {
            my: 2,
            height: '40px',
            minWidth: '90px',
            textDecoration: 'none',
            color: 'white',
            display: 'flex',
            marginLeft: 'auto',
            alignItems: 'center',
            outline: 'white',
            borderColor: 'white',
            textTransform: 'none',
            textAlign: 'center',
            lineHeight: 1,
            Link: {
                textDecoration: 'none',
            }
        },
        Link: {
            color: 'white',
            textDecoration: 'none',
            marginLeft: 'auto',
        },
    };

    const { logout, user, isAuthenticated} = useAuth0();

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const resetSearchParams = () => {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.pushState({}, '', url);
    };

    const handleReload = () => {
        resetSearchParams();
        dispatch(clearData());
    };

    const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
        sessionStorage.setItem("isUserLogged", "true");
        localStorage.setItem('previousPath', `${window.location.pathname}${window.location.search}`);
        loginWithRedirect().then();
    };

    const handleLogout = () => {
        sessionStorage.setItem("isUserLogged", "false");
        logout();
    };

    return (
        <AppBar sx={styles.root}>
            <Container
                maxWidth="xl"
                sx={styles.container}>
                <Toolbar disableGutters>
                    <Avatar variant="square" alt="PABLO MED" src="./logo192.png" />
                    {isAuthenticated && (
                        <Link to={`${ROUTES.APPOINTMENT_SEARCH}?state=booked`} style={styles.buttonsBooked.Link}
                            state={{page: "booked"}}
                            onClick={handleReload}>
                            <Button
                                sx={styles.buttonsBooked}>
                                    Appointments
                            </Button>
                        </Link>
                    )}
                    <Link to={ROUTES.APPOINTMENT_SEARCH} style={styles.buttonsNewAppointment.Link}
                        state={{page: "new-appointment"}}
                        onClick={handleReload}>
                        <Button
                            sx={styles.buttonsNewAppointment}>
                                New Appointment
                        </Button>
                    </Link>
                    {
                        !isAuthenticated && (
                            <Button
                                onClick={handleLogin}
                                variant="outlined"
                                sx={styles.loginButton}>
                            Login
                            </Button>
                        )
                    }
                    {
                        isAuthenticated && (
                            <>
                                <Button
                                    onClick={handleClickOpen}
                                    variant='outlined'
                                    sx={styles.loginButton}>
                                    {user?.name}
                                    <br/>
                                    (Logout)
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}>
                                    <DialogTitle id="alert-dialog-title">
                                        {"Are you sure you want to log out?"}
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleLogout}>LogOut</Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
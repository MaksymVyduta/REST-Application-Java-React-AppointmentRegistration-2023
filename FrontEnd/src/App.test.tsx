import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { MemoryRouter } from "react-router-dom";
import { ROUTES } from "./routes/routes";

test('renders AppointmentSearchPage content will go here', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTES.APPOINTMENT_SEARCH]}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    screen.findByText(/Book A New Appointment/i);
});

test('renders LoginPage content will go here', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    screen.findAllByText(/PABLO-MED/i);
});

test('renders Sign-Up Page content will go here', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTES.SIGN_UP]}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    screen.findByText(/Pablo Med/i);
});

test('Appointment Booking', () => {
    const appointmentId = '12345';
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTES.APPOINTMENT_BOOKING_PAGE.replace(':appointmentId', appointmentId)]}>
                <App />
            </MemoryRouter>,
        </Provider>
    );

    screen.findByText(/Appointment Booking/i);
});


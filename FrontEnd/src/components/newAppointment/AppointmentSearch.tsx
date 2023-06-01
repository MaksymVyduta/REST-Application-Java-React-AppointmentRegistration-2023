import {
    Autocomplete,
    AutocompleteChangeReason,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import {Doctor, selectAllDoctors} from "../../features/doctor/doctorSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAllSpecializations, Specialization} from "../../features/specialization/specializationSlice";
import {fetchAppointments} from "../../features/appointment/appointmentReducer";
import './AppointmentSearch.css';

export interface AppointmentSearchProps {
    doctorUuid: string | null;
    specializationUuid: string | null;
    startDay: Dayjs | null;
    endDay: Dayjs | null;
}

export function AppointmentSearch(props: AppointmentSearchProps) {
    const {doctorUuid, specializationUuid, startDay, endDay} = props;

    const dispatch = useAppDispatch();

    const doctors = useAppSelector(selectAllDoctors);
    const specializations = useAppSelector(selectAllSpecializations);
    const page = new URLSearchParams(window.location.search).get('state');

    const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        setSelectedSpecialization(specializations.find(spec => spec.uuid === specializationUuid) || null);
        setSelectedDoctor(doctors.find(doctor => doctor.uuid === doctorUuid) || null);
        setStartDate(startDay ? dayjs(startDay) : dayjs());
        setEndDate(endDay ? dayjs(endDay) : nextDate);
    }, [props]);

    const filterDoctors = {
        filter: (doctors: Doctor[]) => {
            return selectedSpecialization ? doctors.filter(doctor =>
                doctor.specializationsIds?.includes(selectedSpecialization?.uuid)
            ) : doctors;
        }
    };

    const handleDoctorChange = (event: React.ChangeEvent<object>,
        value: Doctor | null, reason: AutocompleteChangeReason) => {
        if (reason === 'clear') {
            setSelectedDoctor(null);
        } else {
            setSelectedDoctor(value);
        }
    };

    const handleSpecializationChange = (event: SelectChangeEvent) => {
        setSelectedSpecialization(specializations.find(spec => spec.name === event.target.value) || null);
        setSelectedDoctor(null);
    };

    const today = dayjs();
    const nextDate = dayjs().add(1, 'month');

    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = React.useState<Dayjs | null>(nextDate);
    
    const handleStartDateChange = (date : Dayjs | null ) => {
        if (date && date.isBefore(today, "day")) {
            if (!date.isSame(today, "day")) {
                return;
            }
        }
        if(date && endDate && date > endDate){
            return;
        } 
    
        setStartDate(date);
    };

    const handleEndDateChange = (date : Dayjs | null ) => {
        if(date && startDate && date < startDate){
            return;
        }
        setEndDate(date);
    };

    const handleClick = () => {
        const params = {
            doctorUuid: selectedDoctor?.uuid || "",
            specializationUuid: selectedSpecialization?.uuid || "",
            startDate: startDate?.format("YYYY-MM-DD") || "",
            endDate: endDate?.format("YYYY-MM-DD") || "",
            state: new URLSearchParams(window.location.search).get("state") || "new-appointment",
        };

        const search = new URLSearchParams(params).toString();
        const url = `${window.location.pathname}?${search}`;

        window.history.pushState({}, '', url);

        dispatch(fetchAppointments(params));
    };

    return (
        <Container className="appointment-search" maxWidth="xl" sx={{ margin : '20px auto 0', marginBottom : '20px'}}>
            <Typography component='h1' variant='h5' align='center' sx={{mt:-1}}>
                {
                    page === 'booked' &&
                    "Search For Booked Appointments"
                }
                {
                    page !== 'booked' &&
                    "Book A New Appointment"
                }
            </Typography>

            <Grid container spacing={2} sx={{mt:1}}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel required>Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            label="Category"
                            required
                            onChange={handleSpecializationChange}
                            value={selectedSpecialization?.name || ""}
                        >
                            {specializations.map((specialization) => (
                                <MenuItem key={specialization.uuid} value={specialization.name}>
                                    {specialization.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        disablePortal
                        options={filterDoctors.filter(doctors)}
                        getOptionLabel={(option) => option.name}
                        disabled={!selectedSpecialization}
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                        inputValue={selectedDoctor?.name || ""}
                        renderInput={(params) =>
                            <TextField  {...params} label="Doctor *" />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="date-picker"
                            label="Date From"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="date-picker"
                            label="Date To"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} container justifyContent='center'>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={handleClick}
                        disabled={!selectedDoctor}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
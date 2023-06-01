import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AppointmentBookFailView: React.FC = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom color="#FF0000" align="center">
                APPOINTMENT FAILED. THE SELECTED TIME SLOT IS NO LONGER AVAILABLE. PLEASE BOOK ANOTHER APPOINTMENT.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <Button variant="contained" component={RouterLink} to="/" color="primary">
                    BOOK ANOTHER APPOINTMENT
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default AppointmentBookFailView;
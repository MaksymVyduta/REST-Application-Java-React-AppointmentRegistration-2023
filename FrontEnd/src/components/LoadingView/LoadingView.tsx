import React from 'react';
import { LinearProgress } from '@mui/material';


const LoadingView = () => {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
We try to book your appointment. Please wait.
            </div>
            <LinearProgress color="primary" />
        </div>
    );
};

export default LoadingView;
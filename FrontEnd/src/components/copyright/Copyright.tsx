import { Link, Typography } from "@mui/material";
import { Link as RouterLink  } from 'react-router-dom';

export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            Copyright © 
            <Link color="inherit" component={RouterLink} to="/">
                {' '}Pablo-Med
            </Link>{' '}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}
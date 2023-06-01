import { useState } from 'react';
import Box from '@mui/material/Box';
import { Copyright } from "../components/copyright/Copyright";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { ROUTES } from "../routes/routes";
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { patternValidator } from '../components/signUp/SignUpValidator';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';

const EMAIL_REGEXP = /\S+@\S+.\S+/;
const LOGIN_PAGE_TEXT = [
    "Please log in to book the appointment:",
    "You were successfully logged out. Please log in again:",
    "You were successfully signed up. Please log in:",
    "Please log in:"
];
//let [textIndex, setTextIndex] = useState(0);

type FieldsErrorsType = {
    [key: string]: string | undefined;
}
type FieldValidatorsType = {
    [key: string]: (value: string) => string | undefined;
}

type FieldValuesType = {
    [key: string]: string;
}

export default function LoginForm() {

    const handleLogin = () => {
        const role = fieldValues.email.split('@')[0];
        role === 'admin'
            ? sessionStorage.setItem('userRole', 'admin')
            : sessionStorage.setItem('userRole', 'patient');
        sessionStorage.setItem('isUserLogged', 'true');
        sessionStorage.getItem('userRole') === 'admin'
            ? sessionStorage.setItem('name', 'John admin')
            : sessionStorage.setItem('name', 'John');
    };

    const [fieldValues, setFieldsValue] = useState<FieldValuesType>({
        email: '',
        password: '',
    });

    const [fieldsErrors, setFieldsErrors] = useState<FieldsErrorsType>({});

    const handleFieldChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldsValue({
            ...fieldValues,
            [fieldName]: event.target.value
        });
    };

    const handleFieldBlur = (fieldName: string) => () => {
        const fieldValue = fieldValues[fieldName];
        const fieldValidator = fieldValidators[fieldName];
        const fieldError = fieldValidator ? fieldValidator(fieldValue) : undefined;
        setFieldsErrors({
            ...fieldsErrors,
            [fieldName]: fieldError
        });

    };

    const fieldValidators: FieldValidatorsType = {
        email: patternValidator('email', EMAIL_REGEXP),
        password: (passwordValue: string) => {
            if (!passwordValue) {
                return 'Password is required';
            } else if (passwordValue.length < 5) {
                return 'Your password is too short';
            }
            return undefined;
        },
    };

    const isFormValid = (): boolean => {
        return Object.values(fieldsErrors).every(error => !error);
    };

    const { loginWithRedirect } = useAuth0();

    return (
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <Typography component="h1" variant="subtitle1">
                {LOGIN_PAGE_TEXT[0]}
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleFieldChange("email")}
                error={Boolean(fieldsErrors.email)}
                onBlur={handleFieldBlur('email')}
                helperText={fieldsErrors.email}
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleFieldChange("password")}
                error={Boolean(fieldsErrors.password)}
                onBlur={handleFieldBlur('password')}
                helperText={fieldsErrors.password}
                autoComplete="current-password"
            />
            <Button
                onClick={() => loginWithRedirect()}
                fullWidth
                disabled={!isFormValid()}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Login
            </Button>
            <Grid container>
                <Grid item>
                    <Link component={RouterLink} to={ROUTES.SIGN_UP} variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
            <Copyright />
        </Box>
    );
}
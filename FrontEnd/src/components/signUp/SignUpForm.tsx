import * as React from 'react';
import { Link as RouterLink  } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import './SignUp.css';
import { lengthValidator, patternValidator } from './SignUpValidator';


const EMAIL_REGEXP = /\S+@\S+.\S+/;
const PHONE_REGEXP = /^(\+48)?\d{9}$/;

const styles = {
    root: {
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: '#2196f3',
        color: 'black',
        padding: '10px',
        fontWeight: 'bold',
    },
    form: {
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        m: 1,
        bgcolor: 'secondary.main',
    },
    submit: {
        mt: 3,
        mb: 2,
    },
};

type FieldsErrorsType = {
  [key: string]: string | undefined;
}
type FieldValidatorsType = {
  [key: string]: (value: string) => string | undefined;
}

type FieldValuesType = {
  [key: string]: string;
}

export const SignUpForm = () => {
    const [fieldValues, setFieldsValue] = useState<FieldValuesType>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const [isChecked, setIsChecked] = useState(false);

    const [fieldsErrors, setFieldsErrors] = useState<FieldsErrorsType>({});

    const fieldValidators:FieldValidatorsType = {
        firstName: lengthValidator('First Name', 2,30),
        lastName: lengthValidator('Last Name', 2,30),
        email:patternValidator ('email' , EMAIL_REGEXP ),
        phoneNumber: patternValidator ('Phone number' , PHONE_REGEXP ),
        password: (passwordValue: string) => {
            if (!passwordValue) {
                return 'Password is required';
            } else if (passwordValue.length < 5) {
                return 'Your password is too short';
            }
            return undefined;
        },
        repeatPassword: (repeatPasswordValue: string) => {
            if (!repeatPasswordValue) {
                return 'Repeat password is required';
            } else if (repeatPasswordValue !== fieldValues.password) {
                return 'Passwords do not match';
            }
            return undefined;
        }
    };


    const handleFieldBlur = (fieldName: string) =>() => {
        const fieldValue = fieldValues[fieldName];
        const fieldValidator = fieldValidators[fieldName];
        const fieldError = fieldValidator ? fieldValidator(fieldValue) : undefined;
        setFieldsErrors({
            ...fieldsErrors,
            [fieldName]: fieldError
        });

    };


    const handleFieldChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldsValue({
            ...fieldValues,
            [fieldName]: event.target.value
        });
    };

    useEffect(() => {
        const checkbox = document.querySelector('.shake-checkbox');
        if (checkbox && !isChecked) {
            checkbox.classList.add('shake');
        } else if (checkbox) {
            checkbox.classList.remove('shake');
        }
    }, [isChecked]);


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };


    const isFormValid = (): boolean => {
        return Object.values(fieldsErrors).every(error => !error) && isChecked;
    };

    const handleSignUp = () => {
        console.log(fieldValues);
    };
    
    return (
        <Box sx={{ ...styles.root }}>
            <Typography variant="h5" sx={{ ...styles.title }}>
Pablo Med
            </Typography>

            <Box sx={{ ...styles.form }}>
                <Avatar sx={{ ...styles.avatar }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
  Sign up
                </Typography>

                <Box component="div" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={fieldValues.firstName}
                                onChange={handleFieldChange('firstName')}
                                error={Boolean(fieldsErrors.firstName)}
                                onBlur={handleFieldBlur('firstName')}
                                helperText={fieldsErrors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={fieldValues.lasttName}
                                onChange={handleFieldChange('lastName')}
                                error={Boolean(fieldsErrors.lastName)}
                                onBlur={handleFieldBlur('lastName')}
                                helperText={fieldsErrors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={fieldValues.email}
                                onChange={handleFieldChange('email')}
                                onBlur={handleFieldBlur('email')}
                                error={Boolean(fieldsErrors.email)}
                                helperText={fieldsErrors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                autoComplete="tel"
                                value={fieldValues.phoneNumber}
                                onChange={handleFieldChange('phoneNumber')}
                                onBlur={handleFieldBlur('phoneNumber')}
                                error={Boolean(fieldsErrors.phoneNumber)}
                                helperText={fieldsErrors.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={fieldValues.password}
                                onChange={handleFieldChange('password')}
                                onBlur={handleFieldBlur('password')}
                                error={Boolean(fieldsErrors.password)}
                                helperText={fieldsErrors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="repeatPassword"
                                label="Repeat Password"
                                type="password"
                                id="repeatPassword"
                                autoComplete="new-password"
                                onChange={handleFieldChange('repeatPassword')}
                                onBlur={handleFieldBlur('repeatPassword')}
                                error={Boolean(fieldsErrors.repeatPassword)}
                                helperText={fieldsErrors.repeatPassword}
                            />
                        </Grid>
  
                        <Grid item xs={12}>
                            <FormControlLabel className="shake-checkbox"
                                control={<Checkbox required color="primary"  onChange={handleCheckboxChange} />}
                                label ="I accept terms and conditions I hereby agree to processing the personal details by Pablo-Med . "
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={!isFormValid()}
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSignUp}
                    >
                        <Link component={RouterLink} to="/login" style={{ color: '#FFF', textDecoration: 'none' }}>
Sign Up
                        </Link>
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
      Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};
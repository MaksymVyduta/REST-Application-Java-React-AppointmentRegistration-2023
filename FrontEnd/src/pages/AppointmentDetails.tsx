import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import { AppointmentBookingFormValue } from './AppointmentBookingPage';
import { lengthValidator, patternValidator } from '../components/signUp/SignUpValidator';

export type Patient = {
  formValue: AppointmentBookingFormValue, 
  setFormValue: React.Dispatch<React.SetStateAction<AppointmentBookingFormValue>>,
  isStepValid: boolean,
  setIsStepValid: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailsForm: React.FC<Patient> = ({formValue, setFormValue, isStepValid, setIsStepValid}) =>{
  

    // Maksyms validation
      type FieldsErrorsType = {
        [key: string]: string | undefined;
      }
      type FieldValidatorsType = {
        [key: string]: (value: string) => string | undefined;
      }
      

      const EMAIL_REGEXP = /\S+@\S+.\S+/;
      const PHONE_REGEXP = /^(\+48)?\d{9}$/;
      const [fieldsErrors, setFieldsErrors] = React.useState<FieldsErrorsType>({});
      const fieldValidators:FieldValidatorsType = {
          patientFirstname: lengthValidator('First Name', 2,30),
          patientLastname: lengthValidator('Last Name', 2,30),
          patientEmail:patternValidator ('email' , EMAIL_REGEXP ),
          patientPhone: patternValidator ('Phone number' , PHONE_REGEXP ),
      };

      const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.name === "agreeToTerms" ? event.target.checked : event.target.value;
          setFormValue({
              ...formValue,
              [event.target.name]: value
          });
      };



      const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement>)=>{
          const fieldValidator = fieldValidators[event.target.name];
          const fieldError = fieldValidator ? fieldValidator(event.target.value) : undefined;
          setFieldsErrors({
              ...fieldsErrors,
              [event.target.name]: fieldError
          });
          console.log(fieldsErrors);
      };


      const isFormValid = (): boolean => {
          return (Object.values(fieldsErrors).some(error => error) || Object.values(formValue).some(value => value == ''));
      };


      const handleStepValidation = () => {
          setIsStepValid(click => !click);
      };

      return (
          <React.Fragment >
              <form>
                  <Typography variant="h6" gutterBottom>
        Patient Details:
                  </Typography>
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                          <TextField
                              required
                              id= "patientFirstname"
                              autoComplete="given-name"
                              fullWidth
                              label="First name"
                              name="patientFirstname"
                              variant="standard"
                              value= {formValue.patientFirstname}
                              onChange = {handleFieldChange}
                              onBlur={handleFieldBlur}
                              error={Boolean(fieldsErrors.patientFirstname)}
                              helperText={fieldsErrors.patientFirstname} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                              required
                              id="patientLastname"
                              label="Last name"
                              fullWidth
                              autoComplete="family-name"
                              variant="standard"
                              value= {formValue.patientLastname}
                              onChange = {handleFieldChange}
                              onBlur={handleFieldBlur}
                              error={Boolean(fieldsErrors.patientLastname)}
                              helperText={fieldsErrors.patientLastname}
                              name="patientLastname" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                              required
                              id="patientEmail"
                              label="Email"
                              fullWidth
                              autoComplete="Email"
                              variant="standard"
                              value= {formValue.patientEmail}
                              onChange = {handleFieldChange}
                              onBlur={handleFieldBlur}
                              error={Boolean(fieldsErrors.patientEmail)}
                              helperText={fieldsErrors.patientEmail}
                              name="patientEmail" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                              required
                              id="patientPhone"
                              label="Mobile"
                              fullWidth
                              variant="standard"
                              value= {formValue.patientPhone}
                              onChange = {handleFieldChange}
                              onBlur={handleFieldBlur}
                              error={Boolean(fieldsErrors.patientPhone)}
                              helperText={fieldsErrors.patientPhone}
                              name="patientPhone" />
                      </Grid>
                      <Grid item xs={12}>
                          <FormControlLabel
                              control={<Checkbox disabled={isFormValid()} checked={isStepValid}
                                  color="secondary" name="agreeToTerms" onChange={handleStepValidation} />}
                              label="I confirm data are valid and please book a visit"
                          />
                      </Grid>
                  </Grid>
              </form>
          </React.Fragment>
      );
};

export default DetailsForm;

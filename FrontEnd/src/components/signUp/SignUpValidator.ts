// Validator for required fields and its length

export const lengthValidator = (fieldName: string, minLength: number, maxLength: number) =>  (value: string | undefined) => {
    if (!value) {
        return 'Field required';
    } else if (value.length < minLength || value.length > maxLength) {
        return `${fieldName} name should be between ${minLength} and ${maxLength} characters long`;
    }
    return undefined;
};

// pattern used for email validation:  const EMAIL_REGEXP = /\S+@\S+.\S+/;
// pattern used for phone nr  validation: const PHONE_REGEXP = /^(\+48)?\d{9}$/;

export const patternValidator = (fieldName: string, pattern: RegExp) => (value: string | undefined) => {
    if (!value) {
        return `${fieldName} is required`;
    } else if (!pattern.test(value)) {
        return `Invalid ${fieldName}. Please provide correct value`;
    }
    return undefined;
};

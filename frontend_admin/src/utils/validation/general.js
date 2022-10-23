import {
    // required,
    // minLength,
    // maxLength,
    // maxValue,
    // regex,
    // choices,
    minValue,
    number,
    email,
} from 'react-admin';


export const validateEmail = [email()];
export const validateNumberPositive = [number(), minValue(0)];
export const confirmPasswordValidator = (value, values) => {
    if (value !== values["password"]) {
        return "confirmPasswordInvalid";
    }
};

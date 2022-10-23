import {required} from 'react-admin';


export const confirmPasswordValidation = [
    required(),
    (value, values) => {
        if (value !== values["password"]) {
            return "Passwords don't match!";
        }
    }
];

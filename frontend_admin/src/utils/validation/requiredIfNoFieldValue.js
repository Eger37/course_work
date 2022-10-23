import {isEmpty} from './required';


export const requiredIfNoFieldValue = (field, message = 'ra.validation.required') => (value, values) => {
    if (values[field]) return undefined;
    return isEmpty(value) ? message : undefined;
};

export const requiredIfTrue = (isReq, message = 'ra.validation.required') => (value, values) => {
    return isReq && (isEmpty(value) ? message : undefined);
};

import React from 'react';

import {TextInput} from 'react-admin';
import {MaskInput} from './MaskInput';
import {parseDigits} from '../_helpers/parsers';


export const phoneLength = 12;
export const phoneMask = ['+', /\d/, /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];


const validatePhoneCount = (message = 'phoneInvalid') => (value, allValues, props, a, b) => {
    const digits = parseDigits(value);
    if (digits.length < phoneLength) {
        return {message, args: {phoneLength}};
    }
    return;
}

export const validatePhone = [validatePhoneCount()];

// TODO: fix when delete first char and mask begin with cahr
export const MaskPhoneInput = (props) => (
    <MaskInput
        {...props}
        mask={phoneMask}
        placeholderChar={'\u2000'}
        showMask
    />
);

const InputProps = {
    inputComponent: MaskPhoneInput
};

export const PhoneInput = (props) => {
    const validate = React.useMemo(() => ([...props.validate, ...validatePhone]), [props.validate]);

    return (
        <TextInput
            {...props}
            type="tel"
            validate={validate}
            InputProps={InputProps}
            // TODO: Do we nned this? Yes
            parse={parseDigits}
        />
    );
}


PhoneInput.defaultProps = {
    validate: [],
};

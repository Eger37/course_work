import React from 'react';
import {TextInput} from 'react-admin';

import {validateEmail} from '../../utils/validation/general';
import {isEmailRegExp} from '../../utils/regexp';

const InputProps = {
    inputProps: {
        pattern: isEmailRegExp,
    }
};

export const EmailInput = (props) => {
    return (
        <TextInput validate={validateEmail} {...props} type="email" InputProps={InputProps}/>
    )
};

import React from "react";
import {
    TextInput, PasswordInput, required,
} from 'react-admin';

import {GridForm, GridInput} from '../../../components/GridForm/';
import {PhoneInput} from '../../../components/inputs/PhoneInput';
import {EmailInput} from '../../../components/inputs/EmailInput';
import {confirmPasswordValidation} from '../../../utils/validation/confirmPasswordValidation';


export const PsychologistCreateForm = props => (
    <GridForm {...props}>
        <GridInput sm={6} component={TextInput} source="first_name" validate={[required()]} autoFocus/>
        <GridInput sm={6} component={TextInput} source="last_name" validate={[required()]}/>
        <GridInput sm={6} component={PhoneInput} source="phone" validate={[required()]}/>
        <GridInput sm={6} component={EmailInput} source="email" validate={[required()]}/>
        <GridInput sm={6} component={PasswordInput} source="password" validate={[required()]}/>
        <GridInput sm={6} component={PasswordInput} source="confirm_password" validate={confirmPasswordValidation}/>
    </GridForm>
);

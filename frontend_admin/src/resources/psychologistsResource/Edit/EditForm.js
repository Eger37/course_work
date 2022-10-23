import React from "react";
import {TextInput} from 'react-admin';

import {GridForm, GridInput} from '../../../components/GridForm/';
import {PhoneInput} from '../../../components/inputs/PhoneInput';
import {EmailInput} from '../../../components/inputs/EmailInput';

export const PsychologistEditForm = props => (
    <GridForm {...props}>
        <GridInput sm={2} component={TextInput} source="id" disabled/>
        <GridInput sm={5} component={TextInput} source="first_name" autoFocus/>
        <GridInput sm={5} component={TextInput} source="last_name"/>
        <GridInput sm={6} component={PhoneInput} source="phone"/>
        <GridInput sm={6} component={EmailInput} source="email"/>
    </GridForm>
);

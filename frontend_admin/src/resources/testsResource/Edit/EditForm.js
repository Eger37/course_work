import React from "react";
import {
    TextInput, required,
} from 'react-admin';

import {GridForm, GridInput} from '../../../components/GridForm/';

export const TestEditForm = props => (
    <GridForm {...props}>
        <GridInput sm={12} component={TextInput} source="title" validate={[required()]} autoFocus/>
        <GridInput sm={12} component={TextInput} source="subtitle" validate={[required()]}/>
        <GridInput sm={12} component={TextInput} source="description" multiline validate={[required()]}/>
    </GridForm>
);


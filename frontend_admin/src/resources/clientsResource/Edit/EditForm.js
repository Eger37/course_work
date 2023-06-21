import React from "react";
import {TextInput} from 'react-admin';

import {GridForm, GridInput} from '../../../components/GridForm/';

export const ClientEditForm = props => (
    <GridForm {...props}>
        <GridInput sm={12} component={TextInput} source="anamnesisFromPsychologist" label={"Анамнез"}
        multiline/>
    </GridForm>
);

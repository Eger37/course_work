import React from 'react';
import Grid from '@material-ui/core/Grid';

import {ChangePasswordBlock} from './ChangePasswordBlock';
import {ReferenceArrayInput,CheckboxGroupInput, SimpleForm} from 'react-admin';


export const Settings = () => {
    return (
        <Grid container spacing={2} justify="flex-start">
            <Grid item xs={12} md={6} lg={4}>
                <ChangePasswordBlock/>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <SimpleForm
                    id={1}
                    resource="settings"
                >

                    <ReferenceArrayInput  source="email_order_updates_statuses" defaultValue={[]} reference="psychologist" label={"psychologist"}>
                        <CheckboxGroupInput row={false} fullWidth options={{ size: "small" }} />
                    </ReferenceArrayInput>
                </SimpleForm>          </Grid>
        </Grid>
    );
}

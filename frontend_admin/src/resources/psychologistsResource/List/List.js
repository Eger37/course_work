import React from "react";
import {List, Datagrid, TextField, EmailField, EditButton} from 'react-admin';

import {ScrollingWrapper} from '../../../components/ScrollingWrapper';

const defaultSort = {field: 'id', order: 'DESC'};

export const PsychologistList = props => {
    return (
        <List
            {...props}
            sort={defaultSort}
            exporter={false}
            bulkActionButtons={false}
            perPage={22}
        >
            <ScrollingWrapper>
                <Datagrid>
                    <TextField source="id"/>
                    <TextField source="first_name"/>
                    <TextField source="last_name"/>
                    <EmailField source="email"/>
                    <EditButton label=""/>
                </Datagrid>
            </ScrollingWrapper>
        </List>
    );
}

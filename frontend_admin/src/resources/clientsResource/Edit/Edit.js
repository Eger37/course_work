import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {ClientEditForm} from './EditForm';
import {SaveWithCancelToolbar} from "../../../components/toolbars/SaveWithCancelToolbar";


export const ClientEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelToolbar/>}>
            <ClientEditForm/>
        </SimpleForm>
    </Edit>
);

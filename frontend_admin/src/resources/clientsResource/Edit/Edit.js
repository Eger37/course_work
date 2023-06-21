import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {ClientEditForm} from './EditForm';
import {SaveWithCancelToolbar} from "../../../components/toolbars/SaveWithCancelToolbar";


export const ClientEdit = (props) => (
    <Edit {...props} >
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelToolbar/>}
                    redirect={`/client/${props.id}/show/`}>
            <ClientEditForm/>
        </SimpleForm>
    </Edit>
);

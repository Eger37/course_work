import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {TestCreateForm} from '../Create/CreateForm';
import {SaveWithCancelToolbar} from "../../../components/toolbars/SaveWithCancelToolbar";


export const TestEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelToolbar/>}>
            <TestCreateForm/>
        </SimpleForm>
    </Edit>
);

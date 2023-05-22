import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {SaveWithCancelToolbar} from "../../../components/toolbars/SaveWithCancelToolbar";
import {TestEditForm} from "./EditForm";


export const TestEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelToolbar/>}>
            <TestEditForm/>
        </SimpleForm>
    </Edit>
);

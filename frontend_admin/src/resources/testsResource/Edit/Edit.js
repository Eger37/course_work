import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {SaveWithCancelToolbar} from "../../../components/toolbars/SaveWithCancelToolbar";
import {TestEditForm} from "./EditForm";
import {QuestionsField} from "./Questions";


export const TestEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm submitOnEnter={false}
                    toolbar={<SaveWithCancelToolbar after={<QuestionsField/>}/>}>
            <TestEditForm/>
        </SimpleForm>
    </Edit>
);


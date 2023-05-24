import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {SaveWithCancelToolbar} from "../../../components/toolbars/SaveWithCancelToolbar";
import {TestEditForm} from "./EditForm";
import {TestFieldsCombine} from "../Fields/TestFieldsCombine";


export const TestEdit = (props) => (
    <Edit {...props}>
        <SimpleForm submitOnEnter={false}
                    toolbar={<SaveWithCancelToolbar after={<TestFieldsCombine/>}/>}>
            <TestEditForm/>
        </SimpleForm>
    </Edit>
);


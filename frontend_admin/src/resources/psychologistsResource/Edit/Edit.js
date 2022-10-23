import React from "react";
import {
    Edit, SimpleForm,
} from 'react-admin';

import {SaveWithCancelWithPasswordChangeToolbar} from '../../../components/toolbars/SaveWithCancelWithPasswordChangeToolbar';

import {PsychologistEditForm} from './EditForm';


export const PsychologistEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelWithPasswordChangeToolbar/>}>
            <PsychologistEditForm/>
        </SimpleForm>
    </Edit>
);

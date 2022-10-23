import React from "react";
import {Create, SimpleForm} from 'react-admin';

import {SaveWithCancelToolbar} from '../../../components/toolbars/SaveWithCancelToolbar';

import {PsychologistCreateForm} from './CreateForm';


export const PsychologistCreate = (props) => (
    <Create {...props}>
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelToolbar/>} redirect="list">
            <PsychologistCreateForm/>
        </SimpleForm>
    </Create>
);

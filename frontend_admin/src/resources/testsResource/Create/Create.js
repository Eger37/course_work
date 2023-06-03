import React from "react";
import {Create, SimpleForm} from 'react-admin';

import {SaveWithCancelToolbar} from '../../../components/toolbars/SaveWithCancelToolbar';

import {TestCreateForm} from './CreateForm';


export const TestCreate = (props) => (
    <Create {...props}>
        <SimpleForm submitOnEnter={false} toolbar={<SaveWithCancelToolbar/>} redirect="show">
            <TestCreateForm/>
        </SimpleForm>
    </Create>
);

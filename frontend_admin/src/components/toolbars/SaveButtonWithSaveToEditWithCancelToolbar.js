import React from 'react';
import {Toolbar, SaveButton} from 'react-admin';

import {BackButton} from './BackButton';
import {SaveToEditButton} from './SaveToEditButton';


export const SaveButtonWithSaveToEditWithCancelToolbar = ({children, ...props}) => (
    <Toolbar {...props} >
        <SaveButton/>
        <SaveToEditButton/>
        <BackButton/>
        {children}
    </Toolbar>
);

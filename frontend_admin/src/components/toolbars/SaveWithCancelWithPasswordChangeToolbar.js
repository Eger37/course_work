import React from 'react';

import {SaveWithCancelToolbar} from './SaveWithCancelToolbar';
import {ChangeUserPasswordButton, Spacer} from '../dialogs/ChangePasswordDialog';


export const SaveWithCancelWithPasswordChangeToolbar = (props) => (
    <SaveWithCancelToolbar {...props}>
        <Spacer/>
        <ChangeUserPasswordButton userId={props.record.id}/>
    </SaveWithCancelToolbar>
);

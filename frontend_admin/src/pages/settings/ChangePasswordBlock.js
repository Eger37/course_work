import React from 'react';

import {ChangePasswordForm} from '../../components/dialogs/ChangePasswordDialog';
import {CardBlock} from './CardBlock';


export const ChangePasswordBlock = () => {
    return (
        <ChangePasswordForm>
            {({body, buttons}) => (
                <CardBlock
                    title={("change password")}
                    buttons={buttons}
                    children={body}
                />
            )}
        </ChangePasswordForm>
    );
}

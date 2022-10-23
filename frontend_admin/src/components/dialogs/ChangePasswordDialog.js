import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MUIButton from '@material-ui/core/Button';
import MUIIconButton from '@material-ui/core/IconButton';
import PasswordIcon from '@material-ui/icons/VpnKey';

import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
    required, Button, SaveButton, PasswordInput, FormWithRedirect,
    useMutation, useNotify, useLogout, usePermissions,
} from 'react-admin';

import {confirmPasswordValidator} from '../../utils/validation/general';
import {PassProps} from '../_helpers/PassProps';
import {MuiButtonMainProps} from '../_helpers/props/MuiButtonProps';

import {makeToggle} from './Toggle';


const [ChangePasswordProvider, useChangePasswordToggle] = makeToggle();

export {
    ChangePasswordProvider,
    useChangePasswordToggle,
};


export const Spacer = () => {
    return (
        <div style={{flex: 1}}></div>
    )
};


export const ChangePasswordForm = ({userId, children, ...props}) => {
    const notify = useNotify();
    const {permissions} = usePermissions();
    const currentUserId = permissions && permissions.id;

    const renderFunction = typeof children === "function" ? children : undefined

    const logout = useLogout();
    const [mutate, {loading}] = useMutation({
        type: 'update',
        resource: 'user-passwords',
    }, {
        withDeclarativeSideEffectsSupport: true,
        onSuccess: ({data}) => {
            if (userId) {
                notify("password changed", "info");
            } else {
                logout();
            }

            props.onSuccess && props.onSuccess();
        },
        onFailure: (error) => {
            notify(error.message, "error");
        }
    });

    const handleSubmit = async values => {
        mutate(
            {
                payload: {
                    id: userId || currentUserId,
                    data: values,
                }
            },
        );
    };

    return (
        <FormWithRedirect
            submitOnEnter={false}
            component={DialogContent}
            save={handleSubmit}
            render={({handleSubmitWithRedirect, pristine, saving, values}) => {
                const body = (
                    <PassProps childPropKeys={["resource"]} resource="user-passwords">
                        {!userId &&
                        <PasswordInput size="small" source="old_password" validate={required()} fullWidth={true}/>
                        }
                        <PasswordInput size="small" source="password" validate={required()} fullWidth={true}
                                       autoFocus={!!userId}/>
                        <PasswordInput size="small" source="confirm_password"
                                       validate={[required(), confirmPasswordValidator]} fullWidth={true}/>
                    </PassProps>
                );

                const buttons = (
                    <React.Fragment>
                        {props.onCancel && <Button label="ra.action.cancel" onClick={props.onCancel} disabled={loading}
                                                   color="secondary"/>}
                        <SaveButton
                            // size="small"
                            handleSubmitWithRedirect={handleSubmitWithRedirect}
                            pristine={pristine}
                            saving={saving}
                            disabled={loading}
                        />
                    </React.Fragment>
                );

                if (renderFunction) {
                    return renderFunction({
                        body: body,
                        buttons: buttons,
                    });
                }

                return (
                    <React.Fragment>
                        {body}
                        {buttons}
                    </React.Fragment>
                )
            }}
        />
    );
}


export const ChangePasswordDialog = ({userId}) => {
    const modal = useChangePasswordToggle();

    return (
        <ChangePasswordForm userId={userId} onSuccess={modal.close} onCancel={modal.close}>
            {({body, buttons}) => (
                <Dialog open={modal.opened} onClose={modal.close}>
                    <DialogTitle>
                        {"change password"}
                    </DialogTitle>
                    <DialogContent>
                        {body}
                    </DialogContent>
                    <DialogActions>
                        {buttons}
                    </DialogActions>
                </Dialog>
            )}
        </ChangePasswordForm>
    );
}


export const ChangePasswordTrigger = (props) => {
    const modal = useChangePasswordToggle();
    const theme = useTheme();
    const isTextButton = useMediaQuery(theme.breakpoints.up('sm'));

    const handleOpenModal = e => {
        if (e) {
            e.stopPropagation();
        }
        props.onClick && props.onClick();
        modal.open();
    };

    return (
        props.children ?
            React.cloneElement(props.children, {onClick: handleOpenModal})
            :
            isTextButton ?
                <MUIButton {...MuiButtonMainProps} onClick={handleOpenModal}>Change password</MUIButton>
                :
                // <MUIButton {...MuiButtonMainProps} startIcon={<PasswordIcon />} onClick={handleOpenModal}>Change</MUIButton>
                <MUIIconButton color="primary" onClick={handleOpenModal}><PasswordIcon/></MUIIconButton>
    );
}


export const ChangeUserPasswordButton = (props) => (
    <ChangePasswordProvider>
        <ChangePasswordTrigger/>
        <ChangePasswordDialog userId={props.userId}/>
    </ChangePasswordProvider>
);

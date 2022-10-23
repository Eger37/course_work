import React from 'react';
import {
    AppBar,
    usePermissions,
} from 'react-admin';

import Typography from '@material-ui/core/Typography';

import {MyUserMenu} from './UserMenu';


export const UserEmail = () => {
    const {permissions} = usePermissions();

    if (!permissions) return null;

    return (
        <Typography variant="body2">{permissions.email}</Typography>
    );
}


export const MyAppBar = props => (
    <AppBar
        {...props}
        userMenu={<MyUserMenu/>}
    />
);

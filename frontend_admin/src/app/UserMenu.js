import React from 'react';
import {MenuItemLink, usePermissions, UserMenu} from 'react-admin';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import UserIcon from '@material-ui/icons/AccountCircle';
import {withStyles, makeStyles} from '@material-ui/core/styles';


const useUserMenuStyles = makeStyles(theme => ({
    userButton: {
        marginLeft: theme.spacing(1),
    }
}))


export const MyUserMenu = (props) => {
    const {permissions} = usePermissions();
    const userMenuStyles = useUserMenuStyles()

    if (!permissions) return null;

    return (
        <React.Fragment>
            <UserMenu {...props} classes={userMenuStyles}>
                <MenuItemLink
                    to="#"
                    sidebarIsOpen
                    leftIcon={<UserIcon/>}
                    primaryText={permissions.email}
                />
                <MenuItemLink
                    to="/settings"
                    primaryText="Settings"
                    leftIcon={<SettingsIcon/>}
                />
                <Divider/>
            </UserMenu>
        </React.Fragment>
    );
}

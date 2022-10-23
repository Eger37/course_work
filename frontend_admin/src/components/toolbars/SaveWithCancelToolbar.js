import React from 'react';
import {Toolbar, SaveButton} from 'react-admin';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import {withStyles} from "@material-ui/core/styles";

import {BackButton} from './BackButton';

const SaveAndShowButton = withStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
    }
}))(({classes, ...props}) => <SaveButton
    {...props}
    icon={<RemoveRedEyeIcon/>}
    label="ra.action.save_and_show"
    className={classes.root}
    redirect="show"
/>);

export const SaveWithCancelToolbar = ({children, hasShow, ...props}) => {
    return (
        <Toolbar {...props} >
            <SaveButton/>
            {hasShow && <SaveAndShowButton/>}
            <BackButton/>
            {children}
        </Toolbar>
    );
}

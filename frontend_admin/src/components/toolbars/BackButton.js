import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {goBack} from 'react-router-redux';

import {withStyles} from '@material-ui/styles'

import {MuiButtonMainProps} from '../_helpers/props/MuiButtonProps';


const BackButtonRaw = withStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
    }
}))(({goBack, ...props}) => {
    const handleClick = React.useCallback(() => {
        goBack();
    }, [goBack]);

    return <Button className={props.classes.root} {...MuiButtonMainProps} onClick={handleClick}>Cancel</Button>;
})


export const BackButton = connect(null, {
    goBack,
})(BackButtonRaw);

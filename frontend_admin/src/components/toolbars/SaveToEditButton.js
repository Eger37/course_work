import React from 'react';

import {SaveButton, useTranslate} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
    }
}));


export const SaveToEditButton = (props) => {
    const classes = useStyles();
    const t = useTranslate();

    return (
        <SaveButton
            {...props}
            className={classes.root}
            label={t("save_and_edit")}
            redirect="edit"
        />
    );
};

import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        // height: '100%',
    },
    content: {
        height: "calc(100% - 84px)",
    },
    contentFull: {
        height: "calc(100% - 32px)",
    },
});


export const CardBlock = ({title, buttons, children}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={buttons ? classes.content : classes.contentFull}>
                <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                {children}
            </CardContent>
            {buttons ? <CardActions>
                {buttons}
            </CardActions> : <span/>}
        </Card>
    );
}

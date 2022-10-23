import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';


const useSidebarOpened = () => {
    return useSelector(reduxState => reduxState.admin.ui.sidebarOpen);
};


const ScrollingWrapperComponent = ({children, classes, ...props}) => (
    <div className={classes.root}>
        {React.cloneElement(children, props)}
    </div>
);


const useScrollingWrapperStyles = makeStyles(theme => ({
    root: {
        overflow: 'auto',
        maxWidth: '100vw',
        [theme.breakpoints.up('sm')]: {
            // maxWidth: getWidthForScrollingWrapperStyles,
            maxWidth: sidebarOpen => sidebarOpen ? 'calc(100vw - 269px)' : 'calc(100vw - 84px)',
        },
    }
}));

export const ScrollingWrapper = (props) => {
    const sidebarOpen = useSidebarOpened();
    const classes = useScrollingWrapperStyles(sidebarOpen);
    return <ScrollingWrapperComponent classes={classes} {...props} />;
}


const useScrollingWrapperInCardStyles = makeStyles(theme => ({
    root: {
        overflow: 'auto',
        maxWidth: '100vw',
        [theme.breakpoints.up('sm')]: {
            maxWidth: sidebarOpen => sidebarOpen ? 'calc(100vw - 303px)' : 'calc(100vw - 84px)',
        },
    }
}));

export const ScrollingWrapperInCard = (props) => {
    const sidebarOpen = useSidebarOpened();
    const classes = useScrollingWrapperInCardStyles(sidebarOpen);
    return <ScrollingWrapperComponent classes={classes} {...props} />;
}

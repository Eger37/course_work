import React from 'react';

import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import {cloneFormGridItem} from './clone';


const CustomGrid = withStyles({
    'spacing-xs-2': {
        '& > .MuiGrid-item': {
            paddingTop: 0,
            paddingBottom: 0,
        }
    }
})(Grid);


export const GridForm = ({children, ...props}) => {
    return (
        <CustomGrid container spacing={2}>
            {React.Children.map(children, child => cloneFormGridItem(props, child))}
        </CustomGrid>
    );
};

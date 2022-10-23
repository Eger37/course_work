import React from 'react';

import Grid from '@material-ui/core/Grid';
import {withHidden} from '../Hidden';


export const GridSpacingRaw = ({shown, xs, sm, md}) => {
    return (
        <Grid item xs={xs} sm={sm} md={md}/>
    );
}

export const GridSpacing = withHidden(GridSpacingRaw);

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {cloneFormGridItem} from './clone';


export const FormGroup = ({children, ...props}) => {
    return (
        <React.Fragment>
            {React.Children.map(children, (child) =>
                    child && React.cloneElement(child, {
                        ...props,
                        ...child.props,
                    })
            )}
        </React.Fragment>
    );
}


const withTitleStyles = {
    border: '1px solid #eee',
    padding: '4px',
    paddingTop: '4px',
    marginBottom: '8px',
    boxSizing: 'border-box',
    // borderRadius: '4px',
};


export const FormGroupGridRaw = ({
                                     children,
                                     xs = 12,
                                     sm,
                                     md,
                                     lg,
                                     direction,
                                     title = null,
                                     actions = null,
                                     style = null,
                                     ...props
                                 }) => {
    return (
        <Grid
            item
            xs={xs} sm={sm} md={md} lg={lg}
            container
            spacing={2}
            style={{
                padding: 0,
                ...(title ? withTitleStyles : null),
                ...style,
            }}
            direction={direction}
        >
            {title && (
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Typography variant="h6">{title}</Typography>
                        </Box>
                        <Box>
                            {actions}
                            {/* <MUIButton variant="outlined" color="primary" size="small" onClick={(e) => setAnchorEl(e.target)} startIcon={<ArrivedIcon fontSize="small" />}>{prefix.toUpperCase()} Arrived</MUIButton> */}
                        </Box>
                    </Box>
                </Grid>
            )}
            {React.Children.map(children, child => cloneFormGridItem(props, child))}
        </Grid>
    );
};


export const FormGroupGrid = FormGroupGridRaw;

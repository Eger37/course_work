import React from 'react';


export const Hidden = ({hidden, children}) => {
    return (
        <React.Fragment>
            {hidden ? null : children}
        </React.Fragment>
    );
}


export const withHidden = (Component) => ({hidden, ...props}) => (
    <Hidden hidden={hidden}>
        {React.createElement(Component, props)}
    </Hidden>
);

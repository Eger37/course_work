import React from 'react';

export const PassProps = ({component: Component = "div", children, childPropKeys, ...props}) => {
    const childProps = {}
    for (let childPropKey of childPropKeys) {
        if (props[childPropKey]) {
            childProps[childPropKey] = props[childPropKey]
        }

    }
    return (
        <Component {...props}>
            {React.Children.map(children, (child) =>
                child && React.cloneElement(child, childProps)
            )}
        </Component>
    );
}

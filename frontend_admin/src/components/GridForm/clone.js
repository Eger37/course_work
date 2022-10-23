import React from 'react';

import {GridInput} from './GridInput'
import {FormGroup, FormGroupGrid} from './FormGroup'


export const cloneGridInput = ({enabledFields, ...parentProps}, child) => {
    return React.cloneElement(child, {
        resource: parentProps.resource,
        basePath: parentProps.basePath,
        record: parentProps.record,
        ...child.props,
        disabled: child.props.disabled || (enabledFields && !enabledFields[child.props.source]),
        margin: "none",
        size: "small",
    });
}


export const cloneFormGroup = ({enabledFields, ...parentProps}, child) => {
    return React.cloneElement(child, {
        resource: parentProps.resource,
        basePath: parentProps.basePath,
        record: parentProps.record,
        ...child.props,
        enabledFields,
    });
}


export const cloneFormGridItem = (parentProps, child) => {
    if (!child) {
        return child;
    }

    if (child.type === GridInput) {
        return cloneGridInput(parentProps, child);
    } else if (child.type === FormGroupGrid || child.type === FormGroup) {
        return cloneFormGroup(parentProps, child);
    }

    return child;
}

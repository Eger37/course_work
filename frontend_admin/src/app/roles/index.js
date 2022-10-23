import React from 'react';
import {Resource} from 'react-admin';

import {adminResources} from './admin';
import {psychologistResources} from './psychologist';

import {UserRole} from '../../entities/UserRole';


export const resources = {
    [UserRole.admin]: adminResources,

    [UserRole.psychologist]: psychologistResources,
};


export const resourcesByPermissions = permissions => {
    return [
        ...resources[permissions.role],
        <Resource name="settings"/>,
    ];
}

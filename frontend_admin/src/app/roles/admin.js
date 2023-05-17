import React from 'react';
import {Resource} from 'react-admin';

import {clientsResource} from '../../resources/clientsResource/';
import {psychologistsResource} from '../../resources/psychologistsResource/';


export const adminResources = [
    <Resource {...clientsResource} name="client"/>,
    <Resource {...psychologistsResource} name="psychologist"/>,
    <Resource name="user_tests" intent={"registration"}/>,
];

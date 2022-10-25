import React from 'react';
import {Resource} from 'react-admin';

import {clientsResource} from '../../resources/clientsResource/';


export const psychologistResources = [
    <Resource {...clientsResource} name="client"/>,
    <Resource name="user_tests" intent={"registration"}/>,

];

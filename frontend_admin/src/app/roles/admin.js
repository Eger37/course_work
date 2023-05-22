import React from 'react';
import {Resource} from 'react-admin';

import {clientsResource} from '../../resources/clientsResource/';
import {psychologistsResource} from '../../resources/psychologistsResource/';
import {testResource} from "../../resources/testsResource";


export const adminResources = [
    <Resource {...clientsResource} name="client"/>,
    <Resource {...psychologistsResource} name="psychologist"/>,
    <Resource {...testResource} name="test"/>,
    <Resource name="user_tests" intent={"registration"}/>,
    <Resource name="question" intent={"registration"}/>,
];

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
    <Resource name="question-category" intent={"registration"}/>,
    <Resource name="question" intent={"registration"}/>,
    <Resource name="result-option" intent={"registration"}/>,
    <Resource name="answer-option" intent={"registration"}/>,
    <Resource name="testing" intent={"registration"}/>,
    <Resource name="testing-result" intent={"registration"}/>,
];

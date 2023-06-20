import React from "react";
import './index.css';

import {Admin} from 'react-admin';
import {Route, Redirect, useLocation, useParams} from 'react-router-dom';

import {Settings} from '../pages/settings/';

import {MyLayout} from './Layout';
import {authProvider, dataProvider} from '../api/';

import {resourcesByPermissions} from './roles';
import {EditQuestion} from "../resources/testsResource/Fields/Questions/EditQuestion";
import {QuestionsField} from "../resources/testsResource/Fields/Questions";
import {EditTesting} from "../resources/clientsResource/Show/EditTesting";
import {TestingResult} from "../resources/clientsResource/Show/TestingResult";



const customRoutes = [
    <Route exact path="/settings" component={Settings}/>,
    <Route path="/test/:testId/show/questions/:questionId" exact={true} component={() => (<EditQuestion/>)} />,
    <Route path="/client/:clientId/show/testings/:testingId" exact={true} component={() => (<EditTesting/>)} />,
    <Route path="/client/:clientId/show/testings/:testingId/testing-result" exact={true} component={() => (<TestingResult/>)} />,
    <Route path="/test/:testId/question" exact={true} component={() => (<QuestionsField/>)} />,
];


const App = (props) => {
    return (
        <Admin
            layout={MyLayout}
            customRoutes={customRoutes}
            authProvider={authProvider}
            dataProvider={dataProvider}
            catchAll={() => <Redirect to="/"/>}
        >
            {resourcesByPermissions}
        </Admin>
    )
};


export default App;

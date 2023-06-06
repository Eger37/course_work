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



const customRoutes = [
    <Route exact path="/settings" component={Settings}/>,
    <Route path="/test/:testId/show/questions/:questionId" exact={true} component={() => (<EditQuestion/>)} />,
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

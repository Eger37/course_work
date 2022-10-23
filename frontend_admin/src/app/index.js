import React from "react";
import './index.css';

import {Admin} from 'react-admin';
import {Route, Redirect} from 'react-router-dom';

import {Settings} from '../pages/settings/';

import {MyLayout} from './Layout';
import {authProvider, dataProvider} from '../api/';

import {resourcesByPermissions} from './roles';


const customRoutes = [
    <Route exact path="/settings" component={Settings}/>,
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

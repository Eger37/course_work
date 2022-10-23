import React from 'react';
import {Layout} from 'react-admin';

import {MyAppBar} from './AppBar';


export const MyLayout = props => <Layout {...props} appBar={MyAppBar}/>;

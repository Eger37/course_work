import * as React from "react"
import {Admin, Resource} from 'react-admin'
import UserIcon from '@material-ui/icons/Group'
import io from "socket.io-client"

import Dashboard from '../Dashboard'
import {UserList} from '../users'

import {authProvider, dataProvider} from '../api';

// let socket = io.connect(`${CF.host}:${CF.server_port}/`)

class Main extends React.Component {
    render() {
        return (
            <Admin dashboard={Dashboard} authProvider={authProvider}
                   dataProvider={dataProvider}>
                <Resource name="users" list={UserList} icon={UserIcon}/>
            </Admin>
        )
    }
}

export {Main, socket}
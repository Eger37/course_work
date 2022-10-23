import * as React from "react"
import {useEffect} from 'react';


import {List, Datagrid, TextField, UrlField} from 'react-admin'
import {useRefresh} from 'react-admin'


import {socket} from "./app/Main"

export function UserList(props) {

    const refresh = useRefresh()
    const timeToRefresh = () => {
        refresh()
    }
    useEffect(() => {
        // Anything in here is fired on component mount.
        socket.on("refresh_user_urls_list", () => (timeToRefresh()))
        return () => {
            // Anything in here is fired on component unmount.
            socket.off("refresh_user_urls_list")
        }
    }, [])

    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <UrlField source="url"/>
                <refreshThis/>
            </Datagrid>
        </List>)
}

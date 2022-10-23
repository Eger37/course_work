import React from "react";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Box} from "@mui/material"
import {makeStyles} from "@mui/styles"
import {NavLink} from "react-router-dom"
import {authProvider} from "../api/authProvider";
// import { palette } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
}))

const MyAppBar = () => {
    const ifAuth = authProvider.checkAuth()
    const classes = useStyles();
    return (
        <AppBar position={"relative"} >
            <Container fixed>
                <Toolbar>
                    <Box mr={3}>
                        <Typography variant={"h6"} className={classes.title}>Автоматизована система психологічного
                            тестування людини</Typography>
                    </Box>

                    {ifAuth ? <Button color={"secondary"} variant={"contained"}
                                      onClick={() => (authProvider.logout())}>Вийти</Button>
                        :
                        <>
                            <Box mr={3}>
                                <NavLink style={{color: 'white'}} to={"sign-in"}>
                                    <Button color={"inherit"} variant={"outlined"}>Увійти</Button>
                                </NavLink>
                            </Box>
                            <NavLink to={"sign-up"}>
                                <Button color={"secondary"} variant={"contained"}>Зареєструватися</Button>
                            </NavLink>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
};


export default MyAppBar;

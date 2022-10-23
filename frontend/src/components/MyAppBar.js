import React from "react";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Box} from "@mui/material"
import {makeStyles} from "@mui/styles"
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    // menuButton: {
    //     marginRight: "220px"
    // },
    title: {
        flexGrow: 1
    }
}))

const MyAppBar = () => {
    const classes = useStyles();
    return (
            <AppBar position={"fixed"}>
                <Container fixed>
                    <Toolbar>
                        <Box mr={3}>
                            <IconButton edge="start" color={"inherit"} aria-label={"menu"}>
                                <MenuIcon/>
                            </IconButton>
                        </Box>
                        <Typography variant={"h6"} className={classes.title}>Автоматизована система психологічного тестування людини</Typography>
                        <Box mr={3}>
                            <Button color={"inherit"} variant={"outlined"}>Увійти</Button>
                        </Box>
                        <NavLink to={"sign-up"}>
                            <Button color={"secondary"} variant={"contained"}>Зареєструватися</Button>
                        </NavLink>
                    </Toolbar>
                </Container>
            </AppBar>
    )
};


export default MyAppBar;

import React from "react";
import MyAppBar from "../components/MyAppBar";
import {Box} from "@mui/material"
import Info from "../components/Info";
import TestsContent from "../components/TestsContent";


const Main = () => {
    return (
        <>
            <Box mb={1}>
                <MyAppBar/>
            </Box>
            <main>
                <Info/>
                <TestsContent/>
            </main>
        </>
    )
};


export default Main;

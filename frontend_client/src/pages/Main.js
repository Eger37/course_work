import React from "react";
import MyAppBar from "../components/MyAppBar";
import {Box} from "@mui/material"
import Info from "../components/Info";
import TestsContent from "../components/TestsContent";
import {Route} from "react-router-dom";
import TestPage from "./Tests/TestPage";
import TestingPage from "./Tests/TestingPage";


const Main = () => {
    return (
        <>
            <Box mb={1}>
                <MyAppBar/>
            </Box>
            <main>
                {/*<Info/>*/}
                {/*<TestsContent/>*/}

                <Route component={Info} exact={true} path={"/"}/>
                <Route component={TestsContent} exact={true} path={"/"}/>
                <Route component={TestPage} exact={true} path={"/test/:testId"}/>
                <Route component={TestingPage} path={"/test/:testId/testing/:testingId"}/>
            </main>
        </>
    )
};


export default Main;

import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Main from "../pages/Main";
import {BrowserRouter, Route} from "react-router-dom"
import Test1 from "../pages/Tests/Test1";
import TestPage from "../pages/Tests/TestPage";

const App = () => {
    return (
        <BrowserRouter>
            <Route component={Main} exact={true} path={"/"}/>
            <Route component={SignUp} path={"/sign-up"}/>
            <Route component={SignIn} path={"/sign-in"}/>
            <Route component={Test1} path={"/tests/1"}/>
            <Route component={TestPage} path={"/test/:testId"}/>
        </BrowserRouter>
    )
};


export default App;

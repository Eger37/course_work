import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Main from "../pages/Main";
import {BrowserRouter, Route} from "react-router-dom"
import TestPage from "../pages/Tests/TestPage";
import TestingPage from "../pages/Tests/TestingPage/";

const App = () => {
    return (
        <BrowserRouter basename={"/"}>
            <Route component={Main}  path={"/"}/>
            <Route component={SignUp} path={"/sign-up"}/>
            <Route component={SignIn} path={"/sign-in"}/>
        </BrowserRouter>
    )
};


export default App;

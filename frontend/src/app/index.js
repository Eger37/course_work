import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Main from "../pages/Main";
import {BrowserRouter, NavLink, Route} from "react-router-dom"
import {Redirect} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Route component={Main} exact={true} path={"/"}/>
            <Route component={SignUp} path={"/sign-up"}/>
            <Route component={SignIn} path={"/sign-in"}/>
        </BrowserRouter>
    )
};


export default App;

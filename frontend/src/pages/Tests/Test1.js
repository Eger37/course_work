import React from "react";
import {makeStyles} from "@mui/styles"
import {Paper, Container, Grid, Typography} from "@mui/material"
import testImg from "../../images/test.jpg";
import TestInfo from "../../components/TestInfo";
import {testsData} from "../../data/testsData";
import {Route} from "react-router-dom";

const useStyles = makeStyles(() => ({}))

const Info = () => {
    const testData = testsData[0]
    const classes = useStyles();
    return (
        <main>
            <Route exact={true} path={"/tests/1"}
                   render={(props) => <TestInfo title={testData.title} about={testData.about}
                                                page={testData.page + "/start"}/>}
            />


        </main>
    )
};


export default Info;

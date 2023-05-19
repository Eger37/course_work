import React from "react";
import TestInfo from "../../components/TestInfo";
import {testsData} from "../../data/testsData";
import {Route} from "react-router-dom";
import CheckoutTest1 from "../../components/CheckoutTest1";

const Info = () => {
    const testData = testsData[0]
    return (
        <main>
            <Route exact={true} path={"/tests/1"}
                   render={(props) => <TestInfo title={testData.title} about={testData.about}/>}
            />
            <CheckoutTest1/>
        </main>
    )
};


export default Info;

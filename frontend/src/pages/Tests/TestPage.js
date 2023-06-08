import React from "react";
import TestInfo from "../../components/TestInfo";
import {testsData} from "../../data/testsData";
import {getTest} from "../../api/testProvider";
import {useParams} from "react-router-dom";

const TestPage = () => {
    const {testId} = useParams()
    const [test, setTest] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const fetchTest = async () => {
        const test = await getTest(testId).then(data => (data));
        if (test){
            setTest(test);
            setLoading(false);
        }

    };

    React.useEffect(() => {
        fetchTest();
    }, []);

    if (loading){
        return <TestInfo loading/>

    }
    return (
        <main>
            <TestInfo title={test.title} about={test.description}/>
        </main>
    )
};


export default TestPage;

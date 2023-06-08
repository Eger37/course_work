import React from "react";
import TestInfo from "../../components/TestInfo";
import {createOne, getList} from "../../api/dataProvider";
import {NavLink, useParams} from "react-router-dom";
import {Button, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import testImg from "../../images/test.jpg";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    mainFeaturesPostContent: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,.6)",
        padding: 8,
        marginTop: 16,
        marginBottom: 16,
        height: "calc(100vh - 150px)"

    },
    meinFeaturesPost: {
        position: "relative",
        color: "white",
        marginBottom: 4,
        padding: 16,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }
}))

const TestingPage = () => {
    const classes = useStyles();

    const {testId} = useParams()
    const [questions, setQuestions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchQuestions = async () => {
        // const url = `/question?filter={"test_id":${10}}&range={0,999}&sort={"sequential_number":"ASC"}`
        const url = `/question?filter=%7B%22test_id%22%3A${testId}%7D&range=%5B0%2C998%5D&sort=%5B%22sequential_number%22%2C%22ASC%22%5D`
        const questions = await getList(url).then(data => (data));
        if (questions) {
            setQuestions(questions);
            setLoading(false);
        }
    };

    // const createTesting = async () => {
    //     const testing = await createOne("testing", {test_id: testId}).then(data => (data));
    //     if (testing) {
    //         // setTest(test);
    //         setLoading(false);
    //     }
    //
    // };

    React.useEffect(() => {
        fetchQuestions();
        // createTesting();
    }, []);

    // React.useEffect(() => {
    //     fetchQuestions();
    //     createTesting();
    // }, []);

    if (loading){
        return <TestInfo loading/>

    }
    return (
        <main>
            <Paper className={classes.meinFeaturesPost}
                   style={{backgroundImage: `url(${testImg}`,
                   height: "calc(100vh - 50px)"}}>
                {questions}

                <Container fixed>
                    <Grid container>
                        <Grid item md={3}>
                        </Grid>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturesPostContent}>
                                {loading &&
                                    <center>
                                        <CircularProgress/>
                                    </center>}
                            </div>
                        </Grid>
                        <Grid item md={3}/>

                        <Grid item md={3}/>
                        <Grid item md={6}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center"
                              rowSpacing={1}

                        >
                            <Grid item md={6}>
                                <NavLink to={`/`}>
                                    <Button variant="contained" size={"small"} color={"primary"}>
                                        На головну сторінку
                                    </Button>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </main>
    )
};


export default TestingPage;

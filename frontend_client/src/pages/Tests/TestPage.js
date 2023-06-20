import React from "react";
import {NavLink, useParams, Redirect} from "react-router-dom";
import {Button, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

import {getOne, createOne} from "../../api/dataProvider";
import testImg from "../../images/test.jpg";
import {authProvider} from "../../api/authProvider";

const useStyles = makeStyles(() => ({
    mainFeaturesPostContent: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,.6)",
        padding: 8,
        marginTop: 16,
        marginBottom: 16
    },
    meinFeaturesPost: {
        position: "relative",
        color: "white",
        marginBottom: 4,
        padding: 16,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }
}))

const TestPage = () => {
    const classes = useStyles();
    const ifAuth = authProvider.checkAuth()

    const {testId} = useParams()
    const [test, setTest] = React.useState({});
    const [testingId, setTestingId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const fetchTest = async () => {
        const test = await getOne(`/test/${testId}`).then(data => (data));
        if (test) {
            setTest(test);
            setLoading(false);
        }

    };

    React.useEffect(() => {
        void fetchTest();
    }, [])

    const createTesting = async () => {
        setLoading(true);
        const testing = await createOne("/testing", {test_id: testId}).then(data => (data));
        if (testing) {
            setTestingId(testing.id);
            setLoading(false);
        }

    };

    return (
        <main>
            {testingId && <Redirect to={`/test/${testId}/testing/${testingId}`}/>}
            <Paper className={classes.meinFeaturesPost}
                   style={{
                       backgroundImage: `url(${testImg}`,
                       minHeight: "calc(100vh - 50px)"
                   }}>
                <Container fixed>
                    <Grid container>
                        <Grid item md={12}>
                            <div className={classes.mainFeaturesPostContent}>
                                {loading &&
                                    <center>
                                        <CircularProgress/>
                                    </center>}
                                <Typography
                                    align={"center"}
                                    variant={"h5"}
                                    color="white">
                                    {test.title}
                                </Typography>
                                <Typography
                                    variant={"h6"}
                                    color="white">&nbsp;&nbsp;&nbsp;
                                    {test.description}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item md={12}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center"
                              rowSpacing={1}

                        >
                            <Grid item md={3}>
                                <Button variant="contained" size={"small"} color={"primary"}
                                        disabled={!ifAuth}
                                        onClick={createTesting}>
                                    Скласти тест
                                </Button>
                            </Grid>
                            {!ifAuth &&
                                <Grid item md={3}>

                                    <Typography
                                        align={"center"}
                                        variant={"h5"}
                                        color="orangered">
                                        {"Потрібно увійти увійти до облікового запису, щоб пройти тест"}
                                    </Typography>
                                </Grid>
                            }

                            <Grid item md={3}>
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


export default TestPage;

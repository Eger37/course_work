import React from "react";
import {getOne} from "../../api/dataProvider";
import {NavLink, useParams} from "react-router-dom";
import testImg from "../../images/test.jpg";
import {Button, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

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

    const {testId} = useParams()
    const [test, setTest] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const fetchTest = async () => {
        const test = await getOne(testId).then(data => (data));
        if (test){
            setTest(test);
            setLoading(false);
        }

    };

    React.useEffect(() => {
        fetchTest();
    }, []);

    return (
        <main>
            <Paper className={classes.meinFeaturesPost}
                   style={{backgroundImage: `url(${testImg}`,
                   height: "calc(100vh - 50px)"}}>
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
                                <NavLink to={`/test/${testId}/testing`}>
                                    <Button variant="contained" size={"small"} color={"primary"}>
                                        Скласти тест
                                    </Button>
                                </NavLink>
                            </Grid>

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


export default TestPage;

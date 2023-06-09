import React from "react";
import {createOne, getList} from "../../api/dataProvider";
import {NavLink, useParams} from "react-router-dom";
import {Button, CircularProgress, Container, Grid, Paper, Typography, Box} from "@mui/material";
import testImg from "../../images/test.jpg";
import {makeStyles} from "@mui/styles";


import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormControlLabel, MobileStepper, RadioGroup, Radio} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
// import {test1Data} from "../data/testsData"
// import {postTest1} from "../api/dataProvider";
// import {_getPermissions} from "../api/authProvider";

function AnswerOptionsField(props) {
    let [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        const copiedArray = Array.from(props.answers);
        copiedArray[props.activeStep] = event.target.value;
        props.setAnswers(copiedArray)
        setValue(event.target.value);
    };

    const FormControlLabelArray = [
        <FormControlLabel value={7} control={<Radio/>} label="3" labelPlacement="bottom" key={0}/>,
        <FormControlLabel value={6} control={<Radio/>} label="2" labelPlacement="bottom" key={1}/>,
        <FormControlLabel value={5} control={<Radio/>} label="1" labelPlacement="bottom" key={2}/>,
        <FormControlLabel value={4} control={<Radio/>} label="0" labelPlacement="bottom" key={3}/>,
        <FormControlLabel value={3} control={<Radio/>} label="1" labelPlacement="bottom" key={4}/>,
        <FormControlLabel value={2} control={<Radio/>} label="2" labelPlacement="bottom" key={5}/>,
        <FormControlLabel value={1} control={<Radio/>} label="3" labelPlacement="bottom" key={6}/>
    ]
    return (
        <RadioGroup row
                    name="use-radio-group" defaultValue={0}
                    value={value}
                    onChange={handleChange}
        >
            {props.reverse ? FormControlLabelArray.reverse() : FormControlLabelArray}
        </RadioGroup>
    )
}

const theme = createTheme();

export function Testing({questions}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = questions.length;
    const [answers, setAnswers] = React.useState(new Array(maxSteps));

    const handleNextFinish = () => {
        if (activeStep !== maxSteps - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            // postTest1({
            //     // userId: _getPermissions().id,
            //     test1Data: test1Data,
            //     answers: answers
            // })
            //     .then((data) => {
            //         if (data) {
            //             alert(`Результат:\n
            //     Ваш рівень самопочуття ${data.result.well_being.description}\n
            //     Ваш рівень активності ${data.result.activity.description}\n
            //     Ваш рівень настрою ${data.result.mood.description}`)
            //         }
            //     })
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Container component="main" maxWidth="md" sx={{mb: 4}}>


            <Paper variant="outlined"
                   sx={{
                       my: {xs: 3, md: 6},
                       p: {xs: 2, md: 3},
                       // display: "flex",
                       // direction:"column",
                   }}>
                <Grid container
                      direction="column"
                      justifyContent="space-between"
                      minHeight={"calc(100vh - 273px)"}

                >
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Питання:
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {questions[activeStep].text}
                        </Typography>
                    </Grid>

                    <Grid item container
                          justifyContent="center"
                          direction="column"
                    >
                        <Grid item md={12}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center">
                            <AnswerOptionsField
                                question={questions[activeStep]}
                                activeStep={activeStep}
                                answers={answers}
                                setAnswers={setAnswers}
                                reverse={true}
                                key={activeStep}
                            />
                        </Grid>


                        <MobileStepper
                            variant="text"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNextFinish}
                                    disabled={!answers[activeStep]}
                                >
                                    {(activeStep === maxSteps - 1) ? "Finish" : "Next"}
                                    <KeyboardArrowRight/>
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    <KeyboardArrowLeft/>
                                    Back
                                </Button>
                            }
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
        ;
}


const useStyles = makeStyles(() => ({
    mainFeaturesPostContent: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,.6)",
        padding: 8,
        marginTop: 16,
        marginBottom: 16,
        minHeight: "calc(100vh - 150px)"

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

    const {testId, testingId} = useParams()
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

    React.useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <main>
            <Paper className={classes.meinFeaturesPost}
                   style={{
                       backgroundImage: `url(${testImg}`,
                       minHeight: "calc(100vh - 50px)"
                   }}>
                <Container fixed>
                    <Grid container>
                        <Grid item md={12}>
                            <div className={classes.mainFeaturesPostContent}>
                                {loading ?
                                    <center>
                                        <CircularProgress/>
                                    </center> :
                                    <Testing questions={questions}/>
                                }
                            </div>
                        </Grid>

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

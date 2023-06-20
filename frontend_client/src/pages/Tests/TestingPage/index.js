import React from "react";
import {createOne, getList, getOne} from "../../../api/dataProvider";
import {NavLink, useParams} from "react-router-dom";
import {Button, CircularProgress, Container, Grid, Paper, Typography,} from "@mui/material";
import testImg from "../../../images/test.jpg";
import {makeStyles} from "@mui/styles";

import {FormControlLabel, MobileStepper, RadioGroup, Radio} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import TestingResult from "./TestingResult";


function AnswerOptionsField({question, testingId, answers, setAnswers, activeStep, ...props}) {
    let [value, setValue] = React.useState(answers[activeStep] ? answers[activeStep] : null);
    const [answerOptions, setAnswerOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchAnswerOptions = async () => {
        const params = {
            filter: {'question_id': question.id},
            range: [0, 998],
            sort: ["id", "ASC"]
        }
        const url = `/answer-option`
        const answerOptions = await getList(url, params).then(data => (data));
        if (answerOptions) {
            setAnswerOptions(answerOptions);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        void fetchAnswerOptions();
    }, []);

    const createAnswer = async (answerOptionId) => {
        // setLoading(true);
        const answer = await createOne("/answer", {
            testing_id: testingId,
            question_id: question.id,
            answer_option_id: answerOptionId
        }).then(data => (data));
        if (answer) {
            const copiedArray = Array.from(answers);
            copiedArray[activeStep] = answerOptionId;
            setAnswers(copiedArray)
            setValue(answerOptionId)
        }
    };

    const handleChange = (event) => {
        const answerOptionId = event.target.value;
        void createAnswer(answerOptionId);
    };

    if (loading) {
        return (
            <center>
                <CircularProgress/>
            </center>
        );
    }
    return (
        <RadioGroup
            name="use-radio-group"
            value={value}
            onChange={handleChange}
        >

            {answerOptions.map((answerOption) => (
                <FormControlLabel key={answerOption.id}
                                  value={answerOption.id}
                                  control={<Radio/>}
                                  label={answerOption.answer_option_text}
                />

            ))}
        </RadioGroup>
    )
}


export function Testing({questions, testingId}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = questions.length;
    const [answers, setAnswers] = React.useState(new Array(maxSteps));

    const [testingResult, setTestingResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const fetchTestingResult = async () => {
        setLoading(true);

        const testingResult = await getOne(`/testing-result/${testingId}`).then(data => (data));
        if (testingResult) {
            console.log("testingResult")
            console.log(testingResult)
            setTestingResult(testingResult);
            setLoading(false);
        }
    };

    const handleNextFinish = () => {
        if (activeStep !== maxSteps - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            void fetchTestingResult()
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
                       my: {xs: 3, md: 3},
                       p: {xs: 2, md: 3},
                       // display: "flex",
                       // direction:"column",
                   }}>

                {loading ?
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          minHeight={"calc(100vh - 315px)"}
                    >
                        <center>
                            <CircularProgress/>
                        </center>
                    </Grid> :
                    testingResult[0] ?
                        <TestingResult testingResult={testingResult}/>
                        :
                        <Grid container
                              direction="column"
                              justifyContent="space-between"
                              minHeight={"calc(100vh - 315px)"}
                        >

                            <Grid item md={12}>
                                <Typography variant="h5" gutterBottom>
                                    Питання:
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {questions[activeStep].text}
                                </Typography>
                                <h1>
                                    {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam amet animi aspernatur commodi cumque dolor dolore, dolores enim explicabo id illum modi nesciunt nihil, rem reprehenderit similique sunt, voluptatum.*/}
                                </h1>
                            </Grid>

                            <Grid item md={12}
                                  container
                                // alignItems="center"
                                // direction="column"
                                // justifyContent="center"
                            >
                                <AnswerOptionsField
                                    question={questions[activeStep]}
                                    testingId={testingId}
                                    activeStep={activeStep}
                                    answers={answers}
                                    setAnswers={setAnswers}
                                    key={activeStep}
                                />
                            </Grid>
                            <Grid item md={12}>
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
                }
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
        minHeight: "calc(100vh - 220px)"

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
        const params = {
            filter: {'test_id': testId},
            range: [0, 998],
            sort: ["sequential_number", "ASC"]
        }
        const url = "/question"
        const questions = await getList(url, params).then(data => (data));
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
                       minHeight: "calc(100vh - 120px)"
                   }}
            >
                <Container fixed maxWidth="md">
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <div className={classes.mainFeaturesPostContent}>
                                {loading ?
                                    <center>
                                        <CircularProgress/>
                                    </center> :
                                    <Testing questions={questions} testingId={testingId}/>
                                }
                            </div>
                        </Grid>

                        <Grid item md={12}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center"
                              rowSpacing={1}

                        >
                            <Grid item md={12}>
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

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormControlLabel, MobileStepper, RadioGroup, Radio} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {test1Data} from "../data/testsData"
import Grid from "@mui/material/Grid";
import {postTest1} from "../api/testsProvider";
import {_getPermissions} from "../api/authProvider";

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

function MyRadioGroup(props) {
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

export default function CheckoutTest1() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [answers, setAnswers] = React.useState(new Array(30));
    const maxSteps = steps.length;

    const handleNextFinish = () => {
        if (activeStep !== maxSteps - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            postTest1({
                userId: _getPermissions().id,
                test1Data: test1Data,
                answers: answers
            })
            .then((data) => {
                if (data) {
                    alert(`Результат:\n
                Ваш рівень самопочуття ${data.result.well_being.description}\n
                Ваш рівень активності ${data.result.activity.description}\n
                Ваш рівень настрою ${data.result.mood.description}`)
                }
            })
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container component="main" maxWidth="md" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Grid container>
                        <Grid item md={6}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center">
                            <Typography>{test1Data[activeStep].left}</Typography></Grid>
                        <Grid item md={6}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center">
                            <Typography>{test1Data[activeStep].right}</Typography>
                        </Grid>
                        <Grid item md={12}
                              container
                              alignItems="center"
                              direction="column"
                              justifyContent="center">
                            <MyRadioGroup
                                activeStep={activeStep}
                                answers={answers}
                                setAnswers={setAnswers}
                                reverse={test1Data[activeStep].reverse}
                                key={activeStep}
                            />
                        </Grid>
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
                            >{(activeStep === maxSteps - 1) ? "Finish" : "Next"}
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft/>
                                ) : (
                                    <KeyboardArrowRight/>
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight/>
                                ) : (
                                    <KeyboardArrowLeft/>
                                )}
                                Back
                            </Button>
                        }
                    />
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
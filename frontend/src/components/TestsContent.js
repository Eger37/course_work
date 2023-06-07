import React from "react";
import {makeStyles} from "@mui/styles"
import {Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material"
import {NavLink} from "react-router-dom"

// import {testsData} from "../data/testsData";
import {getTests} from "../api/testsProvider"
import testImg from "../images/test.jpg";

const useStyles = makeStyles(() => ({
    cardMedia: {
        paddingTop: "50%",
    },
    cardContent: {
        flexGrow: 1
    },
}))


const TestsCard = ({test}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                // image={test.image}
                image={testImg}
                title={"Image title"}>
            </CardMedia>
            <CardContent>
                <Typography variant={"h5"} color={"textPrimary"}>
                    {test.title}
                </Typography>
                <Typography variant={"h7"} color={"textPrimary"}>
                    {test.subtitle}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to={`test/${test.id}`}>
                    <Button size={"small"} color={"primary"}>
                        Скласти тест
                    </Button>
                </NavLink>
            </CardActions>
        </Card>
    )
}
const TestsContent = () => {
    const classes = useStyles();
    const [tests, setTests] = React.useState([]);
    const fetchTests = async () => {
        const tests = await getTests().then(data => (data));
        setTests(tests)
    };

    React.useEffect(() => {
        fetchTests();
    }, []);

    return (<>
            <div content={classes.mainContent}>
                <Container maxWidth={"sm"}>
                    <Typography variant={"h3"} align={"center"} color={"textPrimary"}>
                        Тести
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth={"md"}>
                <Grid container spacing={4}>
                    {tests.map((test) => (
                        <Grid item key={test.id} xs={12} sm={6} md={4}>
                            <TestsCard test={test}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </>
    )
};


export default TestsContent;

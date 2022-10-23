import React from "react";
import {makeStyles} from "@mui/styles"
import {Container, Grid, Typography, Card, CardMedia, Button, CardActions, CardContent} from "@mui/material"
import {NavLink} from "react-router-dom"

import {testsData} from "../data/testsData";

const useStyles = makeStyles(() => ({
    cardMedia: {
        paddingTop: "50%",
    },
    cardContent: {
        flexGrow: 1
    },
}))

const TestsContent = () => {
    const classes = useStyles();
    return (<>
            <div content={classes.mainContent}>
                <Container maxWidth={"sm"}>
                    <Typography variant={"h3"} align={"center"} color={"textPrimary"} getterBottom>
                        Тести
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth={"md"}>
                <Grid container spacing={4}>
                    {testsData.map((card) => (
                        <Grid item key={card.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={card.image}
                                    title={"Image title"}>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant={"h5"} color={"textPrimary"}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant={"h7"} color={"textPrimary"}>
                                        {card.subtitle}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NavLink to={card.page}>
                                    <Button size={"small"} color={"primary"}>
                                        Скласти тест
                                    </Button>
                                    </NavLink>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </>
    )
};


export default TestsContent;

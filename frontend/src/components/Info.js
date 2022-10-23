import React from "react";
import {makeStyles} from "@mui/styles"
import {Paper, Container, Grid, Typography} from "@mui/material"
import testImg from "../images/test.jpg";

const useStyles = makeStyles(() => ({
    mainFeaturesPostContent: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,.4)",
        padding: 8,
        marginTop: 16,
        marginBottom: 16
    },
    meinFeaturesPost: {
        position: "relative",
        color: "white",
        marginBottom: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }
}))

const Info = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.meinFeaturesPost}
               style={{backgroundImage: `url(${testImg}`}}>
            <Container fixed>
                <Grid container>
                    <Grid item md={3}>
                    </Grid>
                    <Grid item md={6}>
                        <div className={classes.mainFeaturesPostContent}>
                            <Typography
                                component={"h5"}
                                color="grey">&nbsp;&nbsp;&nbsp;Психологічні тести створені для визначення та виявлення
                                важливих якостей та можливих відхилень у психіці людини. Також вони допомагають
                                розібратися зі своїми внутрішніми протиріччями. Але при цьому не слід забувати, що
                                коректно інтерпретувати їхні результати може лише психолог. Тому якщо ви, пройшовши
                                тест, дізнаєтеся про себе щось тривожне, то не варто негайно панікувати. Спочатку
                                зверніться до фахівця. А якщо ви увійдете до свого аккаунту, то результати тесту будуть
                                збережені і психолог зможе надати вам відповідь.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Paper>)
};


export default Info;

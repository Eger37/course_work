import {Grid, Paper, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";

export function CategoryResult({categoryResult}) {

    return (
        <Paper
            sx={{
                my: 1,
                mx: 'auto',
                p: 2,
            }}
        >
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar>W</Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Typography noWrap>{categoryResult.question_category.id}</Typography>
                    <Typography noWrap>{categoryResult.question_category.name}</Typography>
                    <Typography noWrap>{categoryResult.question_category.description}</Typography>
                    <Typography noWrap>{categoryResult.score}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function TestingResult({testingResult}) {
    console.log("testingResult in TestingResult")
    console.log(testingResult)
    return (
        <Grid
            minHeight={"calc(100vh - 245px)"}
        >
            {testingResult.map((categoryResult) => (

                <Grid item key={categoryResult.question_category.id} sm={12}>
                    <CategoryResult categoryResult={categoryResult}/>
                </Grid>
            ))}
        </Grid>
    );
}
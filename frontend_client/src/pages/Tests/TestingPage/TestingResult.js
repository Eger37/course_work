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
                <Grid item xs zeroMinWidth>
                    <Typography variant="h5" gutterBottom>{categoryResult.question_category.name}</Typography>

                    <Typography gutterBottom>{categoryResult.question_category.description}</Typography>
                    <Typography gutterBottom sx={{fontWeight: 'bold'}}>
                        Набрано балів у категорії: {categoryResult.score}
                    </Typography>
                    <Typography gutterBottom sx={{fontWeight: 'bold'}}>
                        {categoryResult.result_option.text}
                    </Typography>

                </Grid>
            </Grid>
        </Paper>
    );
}

export default function TestingResult({testingResult}) {
    return (
        <Grid
            minHeight={"calc(100vh - 245px)"}
        >
            <center>
                <Typography variant="h4" noWrap>Результат</Typography>
            </center>

            {testingResult.testing_result_for_category.map((categoryResult) => (

                <Grid item key={categoryResult.question_category.id} sm={12}>
                    <CategoryResult categoryResult={categoryResult}/>
                </Grid>
            ))}
        </Grid>
    );
}
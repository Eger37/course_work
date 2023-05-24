import React from "react";
import Paper from '@material-ui/core/Paper';
import {QuestionsField} from "./Questions";


export const TestFieldsCombine = (props) => (
    <Paper elevation={3}>
        <QuestionsField {...props}/>
    </Paper>
);


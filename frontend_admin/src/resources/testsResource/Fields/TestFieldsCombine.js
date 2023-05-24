import React from "react";
import Paper from '@material-ui/core/Paper';
import {QuestionsField} from "./Questions";
import {QuestionCategoriesField} from "./QuestionCategories";


export const TestFieldsCombine = (props) => (
    <Paper elevation={3}>
        <QuestionCategoriesField {...props}/>
        <br/>
        <QuestionsField {...props}/>

    </Paper>
);


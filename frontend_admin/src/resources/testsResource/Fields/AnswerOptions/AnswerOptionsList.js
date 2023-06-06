import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {Datagrid, TextField, FunctionField, ReferenceManyField,} from 'react-admin';

import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddAnswerOption} from './AddAnswerOption';
import {EditAnswerOption} from "./EditAnswerOption";
import {DeleteAnswerOption} from "./DeleteAnswerOption";


export const ResultOptionsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <h2 align={"center"}>Answer options</h2>
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <FunctionField label={"Edit"} render={record => <EditAnswerOption answerOption={record}
                                                                                      test={props.test}/>}
                    />
                    <FunctionField label={"Delete"} render={record => <DeleteAnswerOption answerOption={record}/>}/>

                    <TextField sortable={false} source="question_category_id"
                               label="Category"/>
                    <TextField sortable={false} source="score"
                               label="Score"/>
                    <TextField sortable={false} source="answer_option_text"
                               label="Text"/>


                </Datagrid>

            </ScrollingWrapperInCard>
            <Box p={1} display="flex" alignItems="center" justifyContent="space-between" boxSizing="border-box">
                <Box display="flex">
                    <Box display="flex" alignItems="flex-end">
                        <AddAnswerOption question={props.question} test={props.test}/>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}


export const AnswerOptionsField = (props) => {
    return (
        <ReferenceManyField reference={"answer-option"} target="question_id"
                            sort={{field: "id", order: "ASC"}} {...props}>
            <ResultOptionsDatagrid test={props.record} question={props.question}/>
        </ReferenceManyField>
    );
};


AnswerOptionsField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

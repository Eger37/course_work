import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {Datagrid, TextField, FunctionField, ReferenceManyField, ReferenceField,} from 'react-admin';

import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddAnswerOption} from './AddAnswerOption';
import {EditAnswerOption} from "./EditAnswerOption";
import {DeleteAnswerOption} from "./DeleteAnswerOption";


export const ResultOptionsDatagrid = ({testId, ...props}) => {
    return (
        <Paper variant="outlined">
            <h2 align={"center"}>Answer options</h2>
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <FunctionField label={"Edit"} render={record => <EditAnswerOption answerOption={record}
                                                                                      testId={testId}/>}
                    />
                    <FunctionField label={"Delete"} render={record => <DeleteAnswerOption answerOption={record}/>}/>

                    <ReferenceField label="Category" source="question_category_id" reference="question-category">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField sortable={false} source="score"
                               label="Score"/>
                    <TextField sortable={false} source="answer_option_text"
                               label="Text"/>


                </Datagrid>

            </ScrollingWrapperInCard>
            <Box p={1} display="flex" alignItems="center" justifyContent="space-between" boxSizing="border-box">
                <Box display="flex">
                    <Box display="flex" alignItems="flex-end">
                        <AddAnswerOption question={props.question} testId={testId}/>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}


export const AnswerOptionsField = ({testId, ...props}) => {
    return (
        <ReferenceManyField reference={"answer-option"} target="question_id"
                            sort={{field: "id", order: "ASC"}} {...props}>
            <ResultOptionsDatagrid testId={testId} question={props.question}/>
        </ReferenceManyField>
    );
};


AnswerOptionsField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

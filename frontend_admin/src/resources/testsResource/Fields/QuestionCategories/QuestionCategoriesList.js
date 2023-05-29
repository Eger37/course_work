import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {Datagrid, TextField, FunctionField, ReferenceManyField} from 'react-admin';

import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddQuestionCategory} from './AddQuestionCategory';
import {EditQuestionCategory} from "./EditQuestionCategory";
import {DeleteQuestionCategory} from "./DeleteQuestionCategory";


export const QuestionCategoriesDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <h2 align={"center"}>Question categories</h2>
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <FunctionField label={"Edit"} render={record => <EditQuestionCategory questionCategory={record}/>}/>
                    <FunctionField label={"Delete"} render={record => <DeleteQuestionCategory questionCategory={record}/>}/>

                    <TextField sortable={false} source="name" label="Category name"/>
                    <TextField sortable={false} source="question_category_description" label="Description"/>
                </Datagrid>

            </ScrollingWrapperInCard>
            <Box p={1} display="flex" alignItems="center" justifyContent="space-between" boxSizing="border-box">
                <Box display="flex">
                    <Box display="flex" alignItems="flex-end">
                        <AddQuestionCategory test={props.test}/>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}


export const QuestionCategoriesField = (props) => {
    return (
        <ReferenceManyField reference={"question-category"} target="test_id"
                            sort={{field: "id", order: "ASC"}} {...props}>
            <QuestionCategoriesDatagrid test={props.record}/>
        </ReferenceManyField>
    );
};


QuestionCategoriesField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

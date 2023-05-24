import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {Datagrid, TextField, FunctionField, ReferenceManyField} from 'react-admin';

import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddQuestion} from './AddQuestion';
import {EditQuestion} from "./EditQuestion";
import {DeleteQuestion} from "./DeleteQuestion";


export const QuestionsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <h2 align={"center"}>Questions</h2>
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <FunctionField label={"Edit"} render={record => <EditQuestion question={record}/>}/>
                    <FunctionField label={"Delete"} render={record => <DeleteQuestion question={record}/>}/>

                    <TextField sortable={false} source="sequential_number" label="Sequential number"/>
                    <TextField sortable={false} source="text" label="Question"/>
                </Datagrid>

            </ScrollingWrapperInCard>
            <Box p={1} display="flex" alignItems="center" justifyContent="space-between" boxSizing="border-box">
                <Box display="flex">
                    <Box display="flex" alignItems="flex-end">
                        <AddQuestion test={props.test}/>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}


export const QuestionsField = (props) => {
    return (
        <ReferenceManyField reference={"question"} target="test_id"
                            sort={{field: "sequential_number", order: "ASC"}} {...props}>
            <QuestionsDatagrid test={props.record}/>
        </ReferenceManyField>
    );
};


QuestionsField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

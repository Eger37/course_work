import React from 'react';
import {Link} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {
    Datagrid,
    TextField,
    FunctionField,
    ReferenceManyField,
} from 'react-admin';


import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddQuestion} from './AddQuestion';
import {DeleteQuestion} from "./DeleteQuestion";
import EditIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';


const QuestionEditButton = (props) => {
    return (
        <IconButton
            component={Link}
            to={{pathname: `/test/${props.record.test_id}/show/questions/${props.record.id}`,
            // state: {question: props.record}
        }}
            size="small"
            color="default"
        >
            <EditIcon fontSize="inherit" />

        </IconButton>
    );
};

export const QuestionsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <h2 align={"center"}>Questions</h2>
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <QuestionEditButton label={"Edit"}/>
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
                            sort={{field: "sequential_number", order: "ASC"}}
                            perPage={999}
                            {...props}>
            <QuestionsDatagrid test={props.record}/>
        </ReferenceManyField>
    );
};


QuestionsField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

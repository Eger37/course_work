import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIIconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {Datagrid, TextField, FunctionField, ReferenceManyField} from 'react-admin';

import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

// import { StepsPopover } from './StepsPopover';
// import { EditArticle } from './EditArticle';
// import { AddQuestion } from './AddQuestion';
// import { EditInDialogButton } from "@react-admin/ra-form-layout";


export const QuestionsDatagrid = (props) => {
    console.log(props)

    if (!props.ids || !props.ids.length) {
        return <div>lo</div>
    }

    return (
        <Paper variant="outlined">
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <TextField sortable={false} source="id" label="Number"/>
                    <TextField sortable={false} source="text" label="Question"/>
                    {/*<FunctionField source="edit" render={record => <EditInDialogButton/>}/>*/}

                </Datagrid>

            </ScrollingWrapperInCard>
            <Box p={1} display="flex" alignItems="center" justifyContent="space-between" boxSizing="border-box">
                <Box display="flex">
                    <Box display="flex" alignItems="flex-end">
                        {/*<AddQuestion test={props.test} />*/}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}


export const QuestionsField = (props) => {
    return (
        <ReferenceManyField reference={"question"} target="test_id" {...props}>
            <QuestionsDatagrid test={props.record}/>
        </ReferenceManyField>
    );
};


QuestionsField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {Datagrid, TextField, FunctionField, ReferenceManyField,} from 'react-admin';

import {ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddResultOption} from './AddResultOption';
import {EditResultOption} from "./EditResultOption";
import {DeleteResultOption} from "./DeleteResultOption";


export const ResultOptionsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <h2 align={"center"}>Question categories</h2>
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <FunctionField label={"Edit"} render={record => <EditResultOption resultOption={record}
                                                                                      test={props.test}/>}
                    />
                    <FunctionField label={"Delete"} render={record => <DeleteResultOption resultOption={record}/>}/>

                    <TextField sortable={false} source="question_category_id"
                               label="Category"/>
                    <TextField sortable={false} source="min"
                               label="Minimum score"/>
                    <TextField sortable={false} source="max"
                               label="Maximum score"/>
                    <TextField sortable={false} source="text"
                               label="Text"/>


                </Datagrid>

            </ScrollingWrapperInCard>
            <Box p={1} display="flex" alignItems="center" justifyContent="space-between" boxSizing="border-box">
                <Box display="flex">
                    <Box display="flex" alignItems="flex-end">
                        <AddResultOption test={props.test}/>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}


export const ResultOptionsField = (props) => {
    return (
        <ReferenceManyField reference={"result-option"} target="test_id"
                            sort={{field: "id", order: "ASC"}} {...props}>
            <ResultOptionsDatagrid test={props.record}/>
        </ReferenceManyField>
    );
};


ResultOptionsField.defaultProps = {
    addLabel: true,
    className: 'ra-field-datagrid'
};

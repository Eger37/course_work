import React from 'react';
import {
    Datagrid, TextField, FunctionField,
    ReferenceManyField, DateField
} from 'react-admin';
import Paper from '@material-ui/core/Paper';

import {ScrollingWrapperInCard} from '../../../components/ScrollingWrapper';

export const TestsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <TextField source="id" label="id"/>
                    <DateField source="created_at" showTime={true}/>
                    <FunctionField source="test_type_id" label="назва тесту"
                                   render={record => {
                                       if (record.test_type_id === 1){
                                       return "САН (Самопочуття. Активність. Настрій)"}
                                   }}
                                   sortable={false}/>

                    <TextField source="result" label="результат" sortable={false}/>

                </Datagrid>
            </ScrollingWrapperInCard>
        </Paper>
    );
}


export const TestsField = (props) => (
    <ReferenceManyField {...props} perPage={-1}>
        <TestsDatagrid/>
    </ReferenceManyField>
);


TestsField.defaultProps = {
    addLabel: true,
    className: "ra-field-datagrid",
}

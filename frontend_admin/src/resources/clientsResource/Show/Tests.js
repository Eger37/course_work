import React from 'react';
import {
    Datagrid, TextField, FunctionField,
    ReferenceManyField,
} from 'react-admin';
import Paper from '@material-ui/core/Paper';

import {ScrollingWrapperInCard} from '../../../components/ScrollingWrapper';

export const TestsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <ScrollingWrapperInCard>
                <Datagrid {...props}>

                    <FunctionField source="test_type_id" label="назва тесту"
                                   render={record => {
                                       if (record.test_type_id === 1){
                                       return "САН (Самопочуття. Активність. Настрій)"}
                                   }}/>

                    <TextField source="result" label="результат"/>

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

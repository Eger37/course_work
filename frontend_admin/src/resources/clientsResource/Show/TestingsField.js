import React from 'react';
import {
    Datagrid, TextField, FunctionField,
    ReferenceManyField, DateField, ReferenceField
} from 'react-admin';
import Paper from '@material-ui/core/Paper';

import {Link} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";

import {ScrollingWrapperInCard} from '../../../components/ScrollingWrapper';
import {DeleteTesting} from "./DeleteTesting";


const TestingEditButton = (props) => {
    return (
        <IconButton
            component={Link}
            to={{
                pathname: `/client/${props.record.user_id}/show/testings/${props.record.id}`,
                // state: {question: props.record}
            }}
            size="small"
            color="default"
        >
            <EditIcon fontSize="inherit"/>

        </IconButton>
    );
};

export const TestingsDatagrid = (props) => {
    return (
        <Paper variant="outlined">
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <TestingEditButton label={"Edit"}/>
                    <FunctionField label={"Delete"} render={record => <DeleteTesting testing={record}/>}/>

                    <TextField source="id" label="id"/>
                    <DateField source="created_at" showTime={true}/>
                    <ReferenceField label="test name" source="test_id" reference="test">
                        <TextField source="title"/>
                    </ReferenceField>
                    <TextField source="note" label="Note"/>

                </Datagrid>
            </ScrollingWrapperInCard>
        </Paper>
    );
}


export const TestingsField = (props) => (
    <ReferenceManyField {...props} perPage={-1}>
        <TestingsDatagrid/>
    </ReferenceManyField>
);


TestingsField.defaultProps = {
    addLabel: true,
    className: "ra-field-datagrid",
}

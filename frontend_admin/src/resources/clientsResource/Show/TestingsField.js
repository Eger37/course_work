import React from 'react';
import {
    Datagrid, TextField,
    ReferenceManyField, DateField, ReferenceField, DeleteButton
} from 'react-admin';
import Paper from '@material-ui/core/Paper';

import {Link} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import SubjectIcon from '@material-ui/icons/Subject';

import {ScrollingWrapperInCard} from '../../../components/ScrollingWrapper';

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
const ShowTestingResultButton = (props) => {
    return (
        <IconButton
            component={Link}
            to={{
                pathname: `/client/${props.record.user_id}/show/testings/${props.record.id}/testing-result`,
                // state: {question: props.record}
            }}
            size="small"
            color="default"
        >
            <SubjectIcon fontSize="inherit"/>
            result
        </IconButton>
    );
};

export const TestingsDatagrid = ({userId, ...props}) => {
    return (
        <Paper variant="outlined">
            <ScrollingWrapperInCard>
                <Datagrid {...props}>
                    <ShowTestingResultButton label={"Result"}/>
                    <TestingEditButton label={"Edit note"}/>

                    <TextField source="id" label="id"/>
                    <DateField source="created_at" showTime={true}/>
                    <ReferenceField label="test name" source="test_id" reference="test">
                        <TextField source="title"/>
                    </ReferenceField>
                    <TextField source="note" label="Note"/>
                    <DeleteButton label="" redirect={`/client/${userId}/show/`}/>

                </Datagrid>
            </ScrollingWrapperInCard>
        </Paper>
    );
}


export const TestingsField = (props) => (
    <ReferenceManyField {...props} perPage={-1}>
        <TestingsDatagrid userId={props.record.id}/>
    </ReferenceManyField>
);


TestingsField.defaultProps = {
    addLabel: true,
    className: "ra-field-datagrid",
}

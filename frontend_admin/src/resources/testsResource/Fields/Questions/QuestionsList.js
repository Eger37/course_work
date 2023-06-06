import React from 'react';
import {Link} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import {
    Datagrid,
    TextField,
    FunctionField,
    ReferenceManyField,
    ResourceContextProvider,
    List,
    EditButton, ShowButton, DeleteButton, useRecordContext
} from 'react-admin';

import {useParams} from 'react-router-dom';

import {ScrollingWrapper, ScrollingWrapperInCard} from '../../../../components/ScrollingWrapper';

import {AddQuestion} from './AddQuestion';
import {EditQuestion} from "./EditQuestion";
import {DeleteQuestion} from "./DeleteQuestion";
import {Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';


const QuestionEditButton = (props) => {
    console.log(props)

    // const record = useRecordContext();
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

// export const QuestionsList = props => {
//     const {testId} = useParams();
//     return (
//         <List
//             resource={"question"}
//             sort={{field: "sequential_number", order: "ASC"}}
//             // filter={{testId}}
//             {...props}
//         >
//             <Datagrid {...props}>
//                 <FunctionField label={"Edit"} render={record => <EditQuestion question={record}
//                                                                               test={props.test}/>}/>
//                 <FunctionField label={"Delete"} render={record => <DeleteQuestion question={record}/>}/>
//
//                 <TextField sortable={false} source="sequential_number" label="Sequential number"/>
//                 <TextField sortable={false} source="text" label="Question"/>
//             </Datagrid>
//         </List>
//     );
// }

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

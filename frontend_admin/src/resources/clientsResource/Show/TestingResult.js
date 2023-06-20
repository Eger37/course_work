import React from 'react';

import {
    useMutation, TextInput, FormWithRedirect, NumberInput,
    useQuery, Loading, Error, Show, SimpleShowLayout, TextField
} from 'react-admin';
import {useParams, Redirect} from "react-router-dom"

import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {GridForm, GridInput} from '../../../components/GridForm';


import {useNotifyError} from '../../../utils/notifiers/useNotifyError';
import {TestingsField} from "./TestingsField";
import {ActionsWithBackButton} from "./Show";


// export const EditTestingForm = ({handleSubmit, handleClose, loading, testing}) => (
//     <FormWithRedirect
//         record={testing}
//         component={DialogContent}
//         save={handleSubmit}
//         render={({handleSubmitWithRedirect}) => (
//             <React.Fragment>
//                 <GridForm>
//                     <GridInput xs={12} component={TextInput} label="Note" source="note"
//                                multiline/>
//                 </GridForm>
//                 <DialogActions>
//                     <Button disabled={loading} onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button disabled={loading} onClick={handleSubmitWithRedirect} color="primary">
//                         Update
//                     </Button>
//                 </DialogActions>
//             </React.Fragment>
//         )}
//     />
// )

export const TestingResult = (props) => {
    const notifyError = useNotifyError();
    const {clientId, testingId} = useParams();
    const [redirect, setRedirect] = React.useState(false);
    const {loaded, error, data} = useQuery({
        type: 'getOne',
        resource: 'testing-result',
        payload: {id: testingId}
    });


    const handleClose = () => {
        setRedirect(true);
    }
    if (!loaded) {
        return <Loading/>;
    }
    if (error) {
        return <Error/>;
    }
    return (
        <Paper evaluation={3}>
            {/*<div>*/}

            {/*    {data.testing_result_for_category}*/}

            {/*</div>*/}
            dsadas

            {/*<Show actions={<ActionsWithBackButton hasEdit={true}/>} {...props}>*/}
            {/*    <SimpleShowLayout style={{paddingBottom: 8}}>*/}
            {/*        <TextField source="anamnesisFromPsychologist" label={"Анамнез"}/>*/}
            {/*        <TestingsField label="Tests" reference="testing" target="user_id"/>*/}
            {/*    </SimpleShowLayout>*/}
            {/*</Show>*/}
            {/*// <Paper evaluation={3}>*/}
            {/*//     <Box  sx={{ p: 2 }}>*/}
            {/*//         {redirect && <Redirect to={`/client/${clientId}/show/`}/>}*/}
            {/*//         <h1>Edit testing {testingId}</h1>*/}
            {/*//         <EditTestingForm*/}
            {/*//                           handleClose={handleClose}*/}
            {/*//                           loading={loading}*/}
            {/*//                           testing={data}*/}
            {/*//         />*/}
            {/*//     </Box>*/}
            {/*//*/}
        </Paper>
    );
};

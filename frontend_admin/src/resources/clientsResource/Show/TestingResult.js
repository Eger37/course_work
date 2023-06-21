import React from 'react';

import {
    useMutation, TextInput, FormWithRedirect, NumberInput,
    useQuery, Loading, Error, Show, SimpleShowLayout, TextField
} from 'react-admin';
import {useParams, Redirect} from "react-router-dom"

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {GridForm, GridInput} from '../../../components/GridForm';


import {useNotifyError} from '../../../utils/notifiers/useNotifyError';
import {TestingsField} from "./TestingsField";
import {ActionsWithBackButton} from "./Show";


export function CategoryResult({categoryResult}) {

    return (
        <Paper
            style={{
                marginBottom: 10,
                mx: 'auto',
                padding: 10,
            }}
        >
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                    <Typography variant="h5" gutterBottom>{categoryResult.question_category.name}</Typography>

                    <Typography gutterBottom>{categoryResult.question_category.description}</Typography>
                    <Typography gutterBottom style={{fontWeight: 'bold'}}>
                        Набрано балів у категорії: {categoryResult.score}
                    </Typography>
                    <Typography gutterBottom style={{fontWeight: 'bold'}}>
                        {categoryResult.result_option.text}
                    </Typography>

                </Grid>
            </Grid>
        </Paper>
    );
}

export const TestingResult = (props) => {
    const {clientId, testingId} = useParams();
    const {loaded, error, data} = useQuery({
        type: 'getOne',
        resource: 'testing-result',
        payload: {id: testingId}
    });

    if (!loaded) {
        return <Loading/>;
    }
    if (error) {
        return <Error/>;
    }
    return (
        <Show actions={<ActionsWithBackButton hasList={true} hasEdit={true}/>}
              basePath={`/client/${clientId}/show/`}
              id={testingId}
              record={data}
              resource={"testing-result"}
        >
            <SimpleShowLayout style={{paddingBottom: 8}}>
                <center>
                    <Typography variant="h4" noWrap>Результат</Typography>
                </center>

                {data.testing_result_for_category.map((categoryResult) => (

                    <Grid item key={categoryResult.question_category.id} sm={12}>
                        <CategoryResult categoryResult={categoryResult}/>
                    </Grid>
                ))}

            </SimpleShowLayout>
        </Show>

    );
};

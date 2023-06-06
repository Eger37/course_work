import React from 'react';

import {
    useMutation, TextInput, FormWithRedirect, NumberInput,
    useQuery, Loading, Error
} from 'react-admin';
import {useParams, Redirect} from "react-router-dom"

import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {GridForm, GridInput} from '../../../../components/GridForm';


import {useNotifyError} from '../../../../utils/notifiers/useNotifyError';
import {AnswerOptionsField} from "../AnswerOptions";


export const EditQuestionForm = ({handleSubmit, handleClose, loading, question, testId}) => (
    <FormWithRedirect
        record={question}
        component={DialogContent}
        save={handleSubmit}
        render={({handleSubmitWithRedirect}) => (
            <React.Fragment>
                <GridForm>
                    <GridInput xs={12} component={NumberInput} label="Sequential number"
                               source="sequential_number"/>
                    <GridInput xs={12} component={TextInput} label="Question" source="text"
                               multiline/>

                </GridForm>
                <DialogActions>
                    <Button disabled={loading} onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={handleSubmitWithRedirect} color="primary">
                        Update
                    </Button>
                </DialogActions>

                <AnswerOptionsField question={question} testId={testId}/>
            </React.Fragment>
        )}
    />
)

export const EditQuestion = () => {
    const notifyError = useNotifyError();
    const {testId, questionId} = useParams();
    const [redirect, setRedirect] = React.useState(false);
    const { loaded, error, data } = useQuery({
        type: 'getOne',
        resource: 'question',
        payload: { id: questionId }
    });

    const [approve, {loading}] = useMutation({
        type: 'update',
        resource: 'question',
        payload: {id: questionId},
    }, {
        onSuccess: () => {

            handleClose();
        },
        onFailure: (error) => {
            notifyError(error);
        }
    });

    React.useEffect(() => {

    }, [])


    const handleSubmit = (values) => {
        approve({
            payload: {
                id: questionId,
                data: values,
            }
        })
    }
    const handleClose = () => {
        setRedirect(true);
    }
    if (!loaded) { return <Loading />; }
    if (error) { return <Error />; }
    return (
        <Paper evaluation={3} padding>
            <Box  sx={{ p: 2 }}>
                {redirect && <Redirect to={`/test/${testId}/show/questions/`}/>}
                <h1>Edit question {questionId}</h1>
                <EditQuestionForm handleSubmit={handleSubmit}
                                  handleClose={handleClose}
                                  loading={loading}
                                  question={data}
                                  testId={testId}
                />
            </Box>

        </Paper>
    );
};

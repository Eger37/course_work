import React from 'react';

import {
    useMutation,
    TextInput, FormWithRedirect, NumberInput,
} from 'react-admin';

import {Redirect} from "react-router-dom"

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {GridForm, GridInput} from '../../../../components/GridForm';
import {useSimpleModalToggle} from '../../../../components/dialogs/useSimpleModal';
import {useNotifyError} from '../../../../utils/notifiers/useNotifyError';


export const AddQuestion = (props) => {
    const notifyError = useNotifyError();
    const {open, handleOpen, handleClose} = useSimpleModalToggle();
    const [newQuestionId, setNewQuestionId] = React.useState(null);

    const [approve, {loading}] = useMutation({
        type: 'create',
        resource: 'question',
    }, {
        onSuccess: (data) => {
            handleClose();
            setNewQuestionId(data.data.id);
        },
        onFailure: (error) => {
            notifyError(error);
        }
    });

    const handleSubmit = (values) => {
        approve({
            payload: {
                data: {
                    test_id: props.test.id,
                    ...values,
                },
            }
        });
    }

    return (
        <div style={{textAlign: "center"}}>
            {newQuestionId && <Redirect to={`/test/${props.test.id}/show/questions/${newQuestionId}`}/>}
            <Button size="small" color="primary" variant="contained" startIcon={<AddIcon/>}
                    onClick={handleOpen}>
                Add question
            </Button>
            {open && <Dialog open={open} onClose={handleClose} fullScreen={true}>
                <DialogTitle>Add question</DialogTitle>
                <FormWithRedirect
                    submitOnEnter={false}
                    component={DialogContent}
                    save={handleSubmit}
                    render={({handleSubmitWithRedirect, form, record}) => (
                        <React.Fragment>
                            <GridForm>
                                <GridInput xs={12} component={NumberInput} source="sequential_number"
                                           label="Sequential number"/>
                                <GridInput xs={12} component={TextInput} source="text" label="Question"
                                           multiline/>

                            </GridForm>
                            <DialogActions>
                                <Button disabled={loading} onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button disabled={loading} onClick={handleSubmitWithRedirect} color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </React.Fragment>
                    )}
                />
            </Dialog>}
        </div>
    );
};

import React from 'react';

import {
    useMutation, useRefresh, TextInput, FormWithRedirect
} from 'react-admin';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {GridForm, GridInput} from '../../../../components/GridForm';
import {useSimpleModalToggle} from '../../../../components/dialogs/useSimpleModal';
import {useNotifyError} from '../../../../utils/notifiers/useNotifyError';


export const AddQuestionCategory = (props) => {
    const refresh = useRefresh();
    const notifyError = useNotifyError();
    const {open, handleOpen, handleClose} = useSimpleModalToggle();

    const [approve, {loading}] = useMutation({
        type: 'create', resource: 'question-category',
    }, {
        onSuccess: () => {
            handleClose();
            refresh();
        }, onFailure: (error) => {
            notifyError(error);
        }
    });

    const handleSubmit = (values) => {
        approve({
            payload: {
                data: {
                    test_id: props.test.id, ...values,
                },
            }
        })
    }

    return (<div style={{textAlign: "center"}}>
            <Button size="small" color="primary" variant="contained" startIcon={<AddIcon/>}
                    onClick={handleOpen}>
                Add question category
            </Button>
            {open && <Dialog open={open} onClose={handleClose} fullScreen={true}>
                <DialogTitle>Add question category</DialogTitle>
                <FormWithRedirect
                    submitOnEnter={false}
                    component={DialogContent}
                    save={handleSubmit}
                    render={({handleSubmitWithRedirect, form, record}) => (
                        <React.Fragment>
                            <GridForm>
                                <GridInput xs={12} component={TextInput} source="name" label="Category name" multiline/>
                                <GridInput xs={12} component={TextInput} source="question_category_description"
                                           label="Description"
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
                        </React.Fragment>)}
                />
            </Dialog>}
        </div>);
};

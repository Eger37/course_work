import React from 'react';

import {
    useMutation, TextInput, FormWithRedirect, NumberInput,
} from 'react-admin';
import EditIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useSimpleModalToggle } from '../../../../components/dialogs/useSimpleModal';

import { GridForm, GridInput } from '../../../../components/GridForm';


import { useNotifyError } from '../../../../utils/notifiers/useNotifyError';



export const EditQuestion = ({ question }) => {
	const { open, handleOpen, handleClose } = useSimpleModalToggle();
	const notifyError = useNotifyError();

	const [approve, { loading }] = useMutation({
        type: 'update',
        resource: 'question',
        payload: { id: question.id },
    }, {
		onSuccess: () => {
			handleClose();
		},
		onFailure: (error) => {
			notifyError(error);
		}
	});

	const handleSubmit = (values) => {
		approve({
			payload: {
				id: question.id,
				data: values,
			}
		})
	}

	return (
		<div style={{ textAlign: "center" }}>
			<IconButton aria-label="delete" size="small" color="default" onClick={handleOpen}>
				<EditIcon fontSize="inherit" />
			</IconButton>
            {open && <Dialog open={open} onClose={handleClose} fullScreen={true}>
                <DialogTitle>Edit question {question.id}</DialogTitle>
				<FormWithRedirect
					record={question}
					component={DialogContent}
					save={handleSubmit}
					render={({ handleSubmitWithRedirect }) => (
						<React.Fragment>
                            <GridForm>
                                <GridInput xs={12} component={NumberInput} label="Sequential number"
                                           source="sequential_number"/>
                                <GridInput xs={12}  component={TextInput} label="Question" source="text"
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
						</React.Fragment>
					)}
				/>
			</Dialog>}
		</div>
	);
};

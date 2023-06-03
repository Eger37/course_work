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



export const EditQuestionCategory = ({ questionCategory }) => {
	const { open, handleOpen, handleClose } = useSimpleModalToggle();
	const notifyError = useNotifyError();

	const [approve, { loading }] = useMutation({
        type: 'update',
        resource: 'question-category',
        payload: { id: questionCategory.id },
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
				id: questionCategory.id,
				data: values,
			}
		})
	}

	return (
		<div style={{ textAlign: "center" }}>
			<IconButton size="small" color="default" onClick={handleOpen}>
				<EditIcon fontSize="inherit" />
			</IconButton>
            {open && <Dialog open={open} onClose={handleClose} fullScreen={true}>
                <DialogTitle>Edit question {questionCategory.id}</DialogTitle>
				<FormWithRedirect
					record={questionCategory}
					component={DialogContent}
					save={handleSubmit}
					render={({ handleSubmitWithRedirect }) => (
						<React.Fragment>
							<GridForm>
								<GridInput xs={12} component={TextInput} source="name" label="Category name" multiline/>
								<GridInput xs={12} component={TextInput} source="description" label="Description"
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

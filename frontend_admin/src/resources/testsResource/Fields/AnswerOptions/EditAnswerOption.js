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
import {QuestionCategoryAutocompleteInput} from "../QuestionCategoryAutocompleteInput";



export const EditAnswerOption = ({ answerOption, testId, ...props}) => {
	const { open, handleOpen, handleClose } = useSimpleModalToggle();
	const notifyError = useNotifyError();

	const [approve, { loading }] = useMutation({
        type: 'update',
        resource: 'answer-option',
        payload: { id: answerOption.id },
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
				id: answerOption.id,
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
                <DialogTitle>Edit question {answerOption.id}</DialogTitle>
				<FormWithRedirect
					record={answerOption}
					component={DialogContent}
					save={handleSubmit}
					render={({ handleSubmitWithRedirect }) => (
						<React.Fragment>
							<GridForm>
								<GridInput xs={12} component={QuestionCategoryAutocompleteInput}
										   source="question_category_id" label="Category"
										   testId={testId}/>

								<GridInput xs={12} component={TextInput} source="answer_option_text"
										   label="Text"
										   multiline/>
								<GridInput xs={12} component={NumberInput} source="score"
										   label="Score"/>
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

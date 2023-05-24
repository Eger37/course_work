import React from 'react';

import {
    useMutation,
} from 'react-admin';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';


import {useNotifyError} from '../../../../utils/notifiers/useNotifyError';


export const DeleteQuestionCategory = ({questionCategory}) => {
    const notifyError = useNotifyError();

    const [approve] = useMutation({
        type: 'delete',
        resource: 'question-category',
        payload: {id: questionCategory.id},
    }, {
        onSuccess: () => {
            notifyError("deleted");
        },
        onFailure: (error) => {
            notifyError(error);
        }
    });

    const handleSubmit = (values) => {
        approve({
            payload: {
                id: questionCategory.id,
            }
        })
    }

    return (
        <IconButton aria-label="delete" size="small" color="default" onClick={handleSubmit}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>
    );
};

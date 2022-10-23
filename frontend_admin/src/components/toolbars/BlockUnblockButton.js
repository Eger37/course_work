import * as React from 'react';
import {Fragment, useState} from 'react';
import {
    Button,
    Confirm,
    // useMutation,
    useUpdate,
    useRefresh,
    useNotify,
    // useUnselectAll,
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';

import {MuiButtonMainProps} from '../_helpers/props/MuiButtonProps';

const useButtonStyles = makeStyles({
    label: {
        paddingLeft: '0',
    },
});

const BlockUnblockButton = ({basePath, resource, record, entity, ...props}) => {
    const [open, setOpen] = useState(false);
    const refresh = useRefresh();
    const notify = useNotify();
    // const unselectAll = useUnselectAll();
    const stringResourceBlock = "confirm_block_" + entity;
    const stringResourceUnblock = "confirm_unblock_" + entity;
    const stringResource = record['is_blocked'] ? stringResourceUnblock : stringResourceBlock;
    const buttonClasses = useButtonStyles();

    const [update, {loading}] = useUpdate(
        entity + "-isblocked",
        record['id'],
        {is_blocked: !record['is_blocked']},
        {is_blocked: record['is_blocked']},
        {
            withDeclarativeSideEffectsSupport: true,
            onSuccess: ({data}) => {
                refresh();
                // record['is_blocked'] = data;
                notify(stringResource + ".success", "info");
            },
            onFailure: (error) => {
                notify(error.message, "error");
            }
        }
    );
    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(true)
    };
    const handleDialogClose = () => setOpen(false);

    const handleConfirm = () => {
        update();
        setOpen(false);
    };

    return (
        <Fragment>
            <Button
                label={record['is_blocked'] ? "unblock" : "block"}
                onClick={handleClick}
                {...MuiButtonMainProps}
                classes={buttonClasses}
            />
            <Confirm
                isOpen={open}
                loading={loading}
                title={stringResource + ".title"}
                content={stringResource + ".content"}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </Fragment>
    );
}

export default BlockUnblockButton;

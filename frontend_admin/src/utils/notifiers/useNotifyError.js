import React from 'react';
import {useNotify} from 'react-admin';

export const useNotifyError = () => {
    var notify = useNotify();

    return React.useCallback((error) => {
            // this code is got from useUpdateController/useCreateController
            notify(typeof error === 'string' ? error : error.message || 'ra.notification.http_error', 'error', {
                _: typeof error === 'string' ? error : error && (error.message ? error.message : undefined)
            });
        },
        [notify]
    );
}
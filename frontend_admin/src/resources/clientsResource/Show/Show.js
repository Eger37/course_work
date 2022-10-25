import React from 'react';
import {
    Show,
    ReferenceField,
    SimpleShowLayout,
    FunctionField,
    useRedirect,
    TopToolbar,
    EditButton,
    ShowButton,
} from 'react-admin';

import {TestsField} from './Tests';


import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

export const ActionsWithBackButton = ({
                                          basePath,
                                          data,
                                          hasList,
                                          hasEdit,
                                          hasShow,
                                      }) => {
    const redirect = useRedirect();

    return (
        <TopToolbar>
            {hasList && <Box display="flex">
                <Button startIcon={<ArrowBack/>}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={e => redirect(basePath)}>
                    {"back"}
                </Button>
            </Box>}
            {hasEdit && <Box ml={1} display="flex">
                <EditButton variant="outlined" basePath={basePath} record={data}/>
            </Box>}
            {hasShow && <Box ml={1} display="flex">
                <ShowButton variant="outlined" basePath={basePath} record={data}/>
            </Box>}
            <Box display="flex" flex="1"/>
        </TopToolbar>
    );
}


export const ClientsShow = ({permissions, hasShow, ...props}) => {
    console.log(props)
    return (
        <Show actions={<ActionsWithBackButton hasEdit={true}/>} {...props}>
            <SimpleShowLayout style={{paddingBottom: 8}}>
                <TestsField label="Tests" reference="user_tests" target="user_id"/>
            </SimpleShowLayout>
        </Show>
    );
};

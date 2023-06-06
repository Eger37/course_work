import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    useRedirect,
    TopToolbar,
    EditButton,
    ShowButton,
    TabbedShowLayout,
    Tab,
} from 'react-admin';


import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {QuestionCategoriesField} from "../Fields/QuestionCategories";
import {QuestionsField} from "../Fields/Questions";
import {ResultOptionsField} from "../Fields/ResultOptions";

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


export const TestShow = ({permissions, hasShow, ...props}) => {
    return (
        <Show actions={<ActionsWithBackButton hasEdit={true}/>} {...props}>
            <SimpleShowLayout style={{paddingBottom: 8}}>
                <TabbedShowLayout>
                    <Tab label="Test">
                        <TextField source="title" label={"Title"}/>
                        <TextField source="subtitle" label={"Subtitle"}/>
                        <TextField source="description" label={"Description"}/>
                    </Tab>

                    <Tab label="Question categories" path="question-categories">
                        <QuestionCategoriesField addLabel={false} {...props}/>
                    </Tab>
                    <Tab label="Questions" path="questions">
                        <QuestionsField addLabel={false} {...props}/>
                    </Tab>
                    <Tab label="Result options" path="result-options">
                        <ResultOptionsField addLabel={false} {...props}/>
                    </Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

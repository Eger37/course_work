import React from 'react';

import {
    useGetList, useQuery, useInput, FieldTitle
} from 'react-admin';

import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import MUITextField from '@material-ui/core/TextField';


export const QuestionCategoryAutocompleteInput = (props) => {
    const {input: {name, onChange}, meta: {error, touched}, isRequired} = useInput(props);
    const {data, loading} = useQuery({
        type: "getList",
        resource: "question-category",
        payload: {
            pagination: {page: 0, perPage: 1000},
            sort: {field: 'id', order: 'ASC'},
            // order: {},
            filter: {test_id: props.testId}
        }
    });

    const getOptionLabel = React.useCallback((option) => {
        return `${option.id} | ${option.name}`;
    }, [])

    const filterOptions = React.useCallback((opts, val) => {
        const search = val.inputValue.trim();
        if (!search) return opts;

        const regAllDigit = /^\d+$/;

        if (regAllDigit.test(search)) {
            const optsById = [];
            const optsByName = [];
            for (const opt of opts) {
                if (opt.id.toString().substring(0, search.length) === search) {
                    optsById.push(opt);
                } else if (opt.name.indexOf(search) !== -1) {
                    optsByName.push(opt);
                }
            }
            return optsById.concat(optsByName);
        } else {
            const regSearch = new RegExp(search, "i");
            return opts.filter(el => regSearch.test(el.name));
        }
    }, [])

    return (
        <>
            <Autocomplete
                className="MuiFormControl-marginDense"
                fullWidth
                loading={loading}
                options={data || []}
                getOptionLabel={getOptionLabel}
                filterOptions={filterOptions}
                onChange={(e, value) => {
                    onChange({target: {name: name, value: value?.id}});
                    if (value) {
                        if (props.onItemChange){
                            props.onItemChange(value);
                        }
                    }
                }}
                renderInput={(params) => (
                    <MUITextField
                        {...params}
                        autoFocus={props.autoFocus}
                        error={!!(touched && error)}
                        helperText={touched ? error : ' '}
                        required={isRequired}
                        label={<FieldTitle resource={params.resource} source={props.source} label={props.label}
                                           isRequired={isRequired}/>}
                        variant="filled"
                        size="small"
                    />
                )}
            />
        </>
    );
}
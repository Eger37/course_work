import React from 'react';

import {
	useGetList, useQuery, useInput, FieldTitle
} from 'react-admin';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MUITextField from '@material-ui/core/TextField';

export const ArticleAutocompleteInput = (props) => {
	const { input: { name, onChange }, meta: { error, touched }, isRequired } = useInput(props);
	const articles = useGetList("pricelist-articles-autocomplete", {}, {}, {company_id: props.company_id});

	const filterOptions = React.useMemo(() => {
		return createFilterOptions({
			// matchFrom: 'any',
			matchFrom: 'start',
			// stringify: option => articles.data[option] ? `${articles.data[option].name} ${option}` : option.toString(),
			stringify: option => option.toString()
		});
	}, []);

	const getOptionLabel = React.useCallback((option) => {
		if (!articles.data[option]) return option;
		return `${articles.data[option].name} | ${option}`;
	}, [articles.data])

	return (
		<Autocomplete
			className="MuiFormControl-marginDense"
			fullWidth
			options={articles.ids}
			getOptionLabel={getOptionLabel}
			filterOptions={filterOptions}
			onChange={(e, value) => {
				onChange({ target: { name: name, value: value } });
				const selectedItem = articles.data[value];
				if (selectedItem) {
					props.onItemChange && props.onItemChange(selectedItem);
				}
			}}
			renderInput={(params) => (
				<MUITextField
					{...params}
					autoFocus={props.autoFocus}
					error={!!(touched && error)}
					helperText={touched ? error : ' '}
					required={isRequired}
					label={<FieldTitle resource={params.resource} source={props.source} label={props.label} isRequired={isRequired} />}
					variant="filled"
					size="small"
				/>
			)}
		/>
	);
}

export const ArticleAutocompleteInputAdvanced = (props) => {
	const { input: { name, onChange }, meta: { error, touched }, isRequired } = useInput(props);
	const { data, loading } = useQuery({
		type: "getList",
		resource: "pricelist-articles-autocomplete",
		payload: {
			pagination: {},
			sort: {},
			// order: {},
			filter: {company_id: props.company_id}
		}
	});

	const getOptionLabel = React.useCallback((option) => {
		return `${option.name} | ${option.id}`;
	}, [])

	const filterOptions = React.useCallback((opts, val) => {
		const search = val.inputValue.trim();
		if (!search) return opts;

		const regAllDigit = /^\d+$/;
		
		if (regAllDigit.test(search)) {		
			const optsById = [];
			const optsByName = [];
			for (const opt of opts) {
				if (opt.id.toString().substring(0, search.length) === search){
					optsById.push(opt);
				} else if (opt.name.indexOf(search) !== -1){
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
				onChange({ target: { name: name, value: value?.id } });
                if(value){
					props.onItemChange(value);
				}
			}}
			renderInput={(params) => (
				<MUITextField
					{...params}
					autoFocus={props.autoFocus}
					error={!!(touched && error)}
					helperText={touched ? error : ' '}
					required={isRequired}
					label={<FieldTitle resource={params.resource} source={props.source} label={props.label} isRequired={isRequired} />}
					variant="filled"
					size="small"
				/>
			)}
		/>
		</>
	);
}
import React from 'react';

import { ReferenceField, TextField } from 'react-admin';

import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { ScrollingWrapperInCard } from '../../../../components/ScrollingWrapper';
import { IconButtonPopover } from '../../../../components/popovers/IconButtonPopover';

export const EmptyInternalNotesPopover = (props) => {
	const style = {};
	if (props.prev_notes) {
		style["background"] = "rgba(255,0,0,0.1)";
	}
	return (
		<IconButtonPopover>
			<MUIList dense>
				<MUIListItem button={false} key={`null`}>
					<MUIListItemText secondary={<Typography noWrap variant="body2" style={style}>
						<span>{props.msg}</span>
					</Typography>} />
				</MUIListItem>
			</MUIList>
		</IconButtonPopover>
	);
};

export const InternalNotesPopover = (props) => {
	const notes_count = Object.keys(props.notes).length;

	const render_company_name = str_company_id => str_company_id === "None" ? <span style={{ fontWeight: "bold" }}>OSFC</span> :
		<ReferenceField source="company_id" reference="companies" record={{"company_id": parseInt(str_company_id)}}>
			<TextField source="full_name" style={{fontWeight: "bold"}} />
		</ReferenceField>;
	const render_notes = (str_company_id, notes) => {
		// TODO: transform style into class
		const style = {
			padding: "5px",
			whiteSpace: "pre-line",
			wordWrap: "break-word",
		};
		if (!props.prev_notes || (props.prev_notes && notes !== props.prev_notes[str_company_id])) {
			style["background"] = "rgba(255,0,0,0.1)";
		}
		return <Typography noWrap variant="body2" style={style}>
			<span>{notes}</span>
		</Typography>;
	};	

	return (
		<IconButtonPopover>
			<ScrollingWrapperInCard>
				<MUIList dense style={{ width: "35em" }}>
					{Object.entries(props.notes).map(([str_company_id, notes], index) =>
						<MUIListItem button={true} key={`${str_company_id}`} divider={notes_count > 1 && index !== notes_count - 1}>
							<MUIListItemText primary={render_company_name(str_company_id)} secondary={render_notes(str_company_id, notes)} />
						</MUIListItem>
					)}
				</MUIList>
			</ScrollingWrapperInCard>
		</IconButtonPopover>
	);
};
